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
