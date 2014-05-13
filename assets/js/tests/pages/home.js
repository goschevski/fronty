var chai = require("chai"),
    should = chai.should(),
    Backbone = require('backbone');

var home = require('../pages/home');

describe('Home page', function () {
    it('should be defined', function () {
        home.should.to.exist;
    });
});