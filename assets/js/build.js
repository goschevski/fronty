({
    appDir: '../../',
    baseUrl: 'assets/js/',
    mainConfigFile: 'common.js',
    dir: '../../www-release',
    modules: [
        {
            name: 'common'
        },

        {
            name: 'pages/home',
            exclude: ['underscore', 'jquery', 'backbone']
        }
    ]
})