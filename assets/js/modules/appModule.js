var App = (function (parent, $) {

	// Default config
	var config = {
		holder: 'body'
	};

	function init (options) {
		// Extend config with options
		$.extend(config, options);

		// Create array of modules in holder
		var holder = $(config.holder).data('modules'),
			modules, i;

		modules = holder ? holder.split(" ") : [];

		// Run modules from holder
		if (modules.length > 0) {
			for (i = modules.length - 1; i >= 0; i--) {
				App[modules[i]]();
			}
		}
	}

	return {
		init: init
	};
})(App || {}, jQuery);