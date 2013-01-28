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

	/* Placeholder backup */
	if(!Modernizr.input.placeholder){
		('[placeholder]').focus(function() {
			var input = $(this);
			if (input.val() === input.attr('placeholder')) {
				input.val('');
			}
		}).blur(function() {
			var input = $(this);
			if (input.val() === '' || input.val() === input.attr('placeholder')) {
				input.val(input.attr('placeholder'));
			}}).blur();
               

		$('[placeholder]').parents('form').submit(function() {
			$(this).find('[placeholder]').each(function() {
				var input = $(this);
				if (input.val() === input.attr('placeholder')) {
					input.val('');
				}
			});
		});
	}
});