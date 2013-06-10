({
	appDir: '../../',
	baseUrl: 'assets/js/',
	mainConfigFile: 'common.js',
	dir: '../../www-release',
	modules: [
		{
			name: 'common',
			include: ['vendor/backbone']
		},

		{
			name: 'pages/home',
			exclude: ['backbone']
		}
	]
})