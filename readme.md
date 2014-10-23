# Fronty
Fronty is a boilerplate for starting new front-end projects.

### Why boilerplate?
I explained my opinion on this topic in blog post "[About CSS Frameworks](http://goschevski.com/about-css-frameworks.html)".

### Dependencies
Fronty is using compass framework and compass-normalize plugin for styling.

##### Global
```
$ sudo gem install compass compass-normalize
$ npm i -g gulp
```
##### Local
```
$ npm i
```

### Watch
Gulp is watching all your files, both sass and javascript, so it's crucial to run gulp watch before you start working.

### JSHint Hook
To install pre-commit hook make sure you have jshint installed (`node install -g jshint`).
You can see it in action in blog post "[JSHint Hook](http://goschevski.com/jshint-hook.html)".

### Structure
Sass code base is giving you only some base mixins, functions and variables **without any UI component**.
