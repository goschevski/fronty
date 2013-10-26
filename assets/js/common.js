;(function (win) {

    var require = win.require;

    require.config({
        baseUrl: 'assets/js/',
        urlArgs: 'refresh=' + (+new Date()),
        waitSeconds: 15,

        paths: {
            'text': 'vendor/text',
            'underscore': 'vendor/underscore',
            'backbone': 'vendor/backbone',
            'jquery': 'vendor/jquery'
        },

        shim: {
            'backbone': {
                deps: ['underscore', 'jquery'],
                exports: 'Backbone'
            },

            'underscore': {
                exports: '_'
            }
        }
    });

    require.onError = function (err) {
        if ( err.requireType === 'timeout' ) {
            if ( confirm('Your network seems very slow. Try to reload now?') ) {
                window.location.reload();
            }
        } else {
            throw err;
        }
    };

})(this);

require(['underscore', 'jquery', 'backbone'], function (_, $, BB) {
    var pageName = $('script[data-main][data-page]').attr('data-page');
    return pageName && require([pageName]);
});