/*
|------------------------------------------------------------
| This is the main file for home page
|------------------------------------------------------------
*/

var _ = require('underscore'),
    $ = require('jquery'),
    Backbone = require('backbone');
    Backbone.$ = $;

var Home = Backbone.View.extend({
    test: 'cao',
    initialize: function () {
        this.render();
    },

    render: function () {
        console.log('Home page initialized!');
    }
});

var home = new Home();