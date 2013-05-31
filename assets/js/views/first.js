define(['backbone'], function (BB) {
	var Home = BB.View.extend({
		render: function () {
			this.$el.html('Hello from the home view!');
			return this;
		}
	});

	return Home;
});