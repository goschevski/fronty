define(['backbone', 'namespace'], function (BB) {
	App.Views.Home = BB.View.extend({
		render: function () {
			this.$el.html('Hello from view!');
			return this;
		}
	});
});