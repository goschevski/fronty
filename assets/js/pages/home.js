define(['backbone', '../views/first'], function (BB, homeView) {
	var html = new homeView();

	$('.container').append( html.render().el );
});