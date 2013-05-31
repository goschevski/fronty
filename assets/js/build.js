({
  appDir: '../../',
  baseUrl: 'assets/js/',
  mainConfigFile: 'assets/js/common.js',
  dir: '../../www-release',
  modules: [
    {
      name: 'common',
      include: [
        'vendor/backbone'
      ]
    },

    {
      name: 'pages/home',
      exclude: ['backbone']
    },

    {
      name: 'pages/about',
      exclude: ['backbone']
    }
  ]
})