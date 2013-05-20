define(['backbone', '../views/home'], function () {
	App.Instances.HomeView = new App.Views.Home();

	$('.container').append( App.Instances.HomeView.render().el );
});