/*
|------------------------------------------------------------
| This is the main file for home page
|------------------------------------------------------------
*/

var _ = require('underscore'),
    $ = require('jquery'),
    Backbone = require('backbone');
    Backbone.$ = $;

var App = Backbone.View.extend({
    initialize: function () {
        this.render();
    },

    render: function () {
        console.log('App initialized!');
    }
});

var app = new App();