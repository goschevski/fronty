define(['backbone', '../views/second'], function (BB, aboutView) {
	var html = new aboutView();

	$('.container').append( html.render().el );
});