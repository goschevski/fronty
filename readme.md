# Fronty
Fronty is a boilerplate for starting new front-end projects.

### Why boilerplate?
I explained my opinion on this topic in blog post "[About CSS Frameworks](http://goschevski.com/about-css-frameworks.html)".

### Dependencies
Fronty is using compass framework and compass-normalize plugin for styling.<br />
Build/dev process is compiled via gulp.<br />
Some client-side libraries can't be installed via npm, so fronty is using volo to add that files.<br />

##### Global
```
$ sudo gem install sass --pre
$ sudo gem install compass --pre
$ sudo gem install compass-normalize
$ npm i -g gulp
$ npm i -g volo
```
##### Local
```
$ npm i
$ volo add
```

### Watch
Gulp is watching all your files, both sass and javascript, so it's crucial to run watch before you start working.

```
gulp watch
```

### JSHint Hook
To install pre-commit hook make sure you have jshint installed (`node install -g jshint`).
You can see it in action in blog post "[JSHint Hook](http://goschevski.com/jshint-hook.html)".

### Sass
Sass code base is giving you only some base mixin, functions and variables **without any UI component**.

### JavaScript
JavaScript files also has only base structure. They are complied via browserify as a gulp task.
