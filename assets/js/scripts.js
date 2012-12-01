var App = (function (parent, $) {

	// Default config
	var config = {
		holder: 'body'
	};

	parent.init = function (options) {
		// Extend config with options
		$.extend(config, options);

		// Variables
		var holder = $(config.holder).data('modules'),
			modules, submodule, i;

		// Create modules array
		modules = holder ? holder.split(" ") : [];

		if (modules.length > 0) {
			for (i = modules.length - 1; i >= 0; i--) {
				// Create submodule array
				submodule = modules[i].split("-");
				// Run modules from holder
				App[submodule[0]][submodule[1]]();
			}
		}
	};

	return parent;

})(App || {}, jQuery);
/*--------------------------------------
* MAIN JS FILE
---------------------------------------*/

$(function () {
	App.init();
});