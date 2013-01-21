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
