/*
|------------------------------------------------------------
| This is the main file for home page
|------------------------------------------------------------
*/

define(['backbone'], function (BB) {

	var App = BB.View.extend({
        initialize: function () {
            this.render();
        },

        render: function () {
            console.log('App initialized!');
        }
    });

	return new App();
});