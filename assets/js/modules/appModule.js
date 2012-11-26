var App = (function (parent, $) {

	// Default config
	var config = {
		holder: 'body'
	};

	function init (options) {
		// Extend config with options
		$.extend(config, options);

		// Variables
		var holder = $(config.holder).data('modules'),
			modules, i;

		// Create modules array
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