#Fronty

Fronty is a boilerplate for starting new front-end projects.

### Why boilerplate?
I explained my opinion on this topic on my blog post "[About CSS Frameworks](http://goschevski.com/about-css-frameworks.html)"

### Dependencies

It's using compass framework and compass-normalize plugin for styling.<br />
Build/dev process is compiled via gulp, so install it globbaly.<br />
Some client-side libraries can't be installed via npm, so fronty is using volo to add that files.<br />

```
$ sudo gem install sass --pre
$ sudo gem install compass --pre
$ sudo gem install compass-normalize
$ npm i -g gulp
$ npm i -g volo
```

### Gulp

To watch all files project (sass and javascript) run gulp watch (ofcourse you need to run `npm i` before that).

### Volo

To add required client-side libraries (respond.js and html5.js for IE8) run `volo add`.

### Browserify

Fronty is using browserify which is watching your files via gulp.

### Hooks

To install pre-commit hooks (jshint) make sure you have jshint installed (`node install -g jshint`) and run the following commands.

```
chmod +x hooks.sh
./hooks.sh
```

### Mind-set

#### Sass

Sass code base is giving you only some base mixin, functions and variables **without any UI component**.

Modules is folder where you should spent most of your time.<br />
Code structure that i found working best for me now is organising css code into modules.<br />
You can define how deep you want to go, viz your modules will be pages, ui components or part of the pages, etc.<br />

##### JavaScript

JavaScript folder has some really base structure. Only pages are defined (via Backbone views), but you can define eather
you want folder for each ui component with it's own models, collections, views, etc, or create global folders for all collections,
models, routers, views, etc.
