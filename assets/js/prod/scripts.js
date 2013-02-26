/*--------------------------------------
* App Core
---------------------------------------*/

;(function ($) {
    window.App = {
        Views: {},
        Core: {},
        Instances: {},
        Utils: {
            log: function() {
                window.console && console.log('App log:', Array.prototype.slice.call(arguments));
            },
            has: function(obj, key) {
                return Object.hasOwnProperty.call(obj, key);
            },
            extend: function(protoProps, staticProps) {
                var parent = this,
                    child;

                if (protoProps && App.Utils.has(protoProps, 'constructor')) {
                    child = protoProps.constructor;
                } else {
                    child = function () {
                        return parent.apply(this, arguments);
                    };
                }

                $.extend(child, parent, staticProps);

                var Surrogate = function() {
                        this.constructor = child;
                    };
                Surrogate.prototype = parent.prototype;
                child.prototype = new Surrogate();

                if (protoProps) {
                    $.extend(child.prototype, protoProps);
                }

                child.__super__ = parent.prototype;
                return child;
            }
        }
    };
})(jQuery);

/*--------------------------------------
* App View
---------------------------------------*/

;(function (App, $) {
    var Core = App.Core,
        Utils = App.Utils,
        rEventMatcher = /^(\S+)\s*(.*)$/;

    var View = Core.View = function () {
        this._setElement();
        this.initialize.apply(this, arguments);
        this._bindEvents();
    };

    $.extend( View.prototype, {
        el: '',
        initialize: $.noop,
        events: {},
        render: function () {
            return this.el;
        },
        $: function(selector) {
            return this.el.find(selector);
        },
        _setElement: function () {
            if (!this.el) {
                this.el = document.body;
            }
            this.el = this.el instanceof jQuery ? this.el : $(this.el);
        },
        _bindEvents: function () {
            if ($.isEmptyObject(this.events)) { return; }

            for (var key in this.events) {
                var method = this.events[key];

                if ( !method ) {
                    throw new Error('No method', method);
                }
                var match = key.match(rEventMatcher),
                    eventName = match[1] + '.appEvent',
                    selector = match[2];

                method = $.proxy(this[method], this);
                if (!selector) {
                    this.el.on(eventName, method);
                } else {
                    this.el.on(eventName, selector, method);
                }
            }
        }
    });
    View.extend = Utils.extend;
})(App || {}, jQuery);

/*--------------------------------------
 * Main view
---------------------------------------*/

;(function (App, $) {
    var View = App.Core.View,
        Utils = App.Utils,
        AppView;

    App.Views.App = View.extend({
        initialize: function() {
        	this.render();
        },

        render: function () {
        	// Create instances here
            // App.Instances.Tabs = new App.Views.Tabs();
        }
    });
})(App || {}, jQuery);

/*--------------------------------------
 * MAIN
---------------------------------------*/

$(function () {
	App = new App.Views.App();

	/* Hide address bar on mobile devices (except if #hash present, so we don't mess up deep linking). */
	if (Modernizr.touch && !window.location.hash) {
		$(window).load(function () {
			setTimeout(function () {
				window.scrollTo(0, 1);
			}, 0);
		});
	}
});