define(['backbone'], function (BB) {
	var About = BB.View.extend({
		render: function () {
			this.$el.html('Hello from the about view!');
			return this;
		}
	});

	return About;
});