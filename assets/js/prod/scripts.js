;(function () {
    window.App = (function (me, $) {

        // Default config
        var _config = {
            holder: 'body'
        },

        /* Checks if submodule exist and if route is good call method */
        _executeSubmodule = function (obj, parts) {
            var i = 0,
                partsLen = parts.length,
                part;

            for (; i < partsLen; i++) {
                part = parts[i];

                if (obj !== null && typeof obj === "object" && part in obj) {
                    obj = obj[part];
                } else {
                    return false;
                }
            }

            return obj && obj.call(me);
        },

        /* Takes module names from holder and run it */
        _loadSubmodules = function(options) {
            // Extend config with options
            $.extend(_config, options);

            var holder = $(_config.holder).data('modules'),
                modules = holder ? holder.split(" ") : [],
                modulesLength = modules.length,
                submodule;

            while ( modulesLength && modulesLength-- ) {
                submodule = modules[modulesLength].split("-");
                _executeSubmodule( me, submodule );
            }
        },

        /* Hide address bar on mobile devices (except if #hash present, so we don't mess up deep linking). */
        _removeAddressBar = function () {
            if (Modernizr.touch && !window.location.hash) {
                $(window).load(function () {
                    setTimeout(function () {
                        window.scrollTo(0, 1);
                    }, 0);
                });
            }
        };

        me.init = function (options) {
            _loadSubmodules(options);
            _removeAddressBar();
        };

        return me;

    })(window.App || {}, jQuery);
})();
/*--------------------------------------
* MAIN JS FILE
---------------------------------------*/

$(function () {
	App.init();
});