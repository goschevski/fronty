// gulp
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');
var runSequence = require('run-sequence');

// javascript (browserify, uglify, jshint, jscs)
var packageJSON = require('./package.json');
var jshintConfig = packageJSON.jshint;
var jscsConfig = packageJSON.jscs;
var stylish = require('jshint-stylish');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var through2 = require('through2');
var browserify = require('browserify');
var uglify = require('gulp-uglify');

// images
var imagemin = require('gulp-imagemin');

// project
var david = require('gulp-david');
var todo = require('gulp-todo');

// css
var postcss = require('gulp-postcss');
var cssnext = require('cssnext');
var normalize = require('postcss-normalize');
var assets  = require('postcss-assets');
var nested = require('postcss-nested');
var mixins = require('postcss-mixins');
var extend = require('postcss-extend');
var postcssImport = require('postcss-import');
var minify = require('gulp-minify-css');
var bemLinter = require('postcss-bem-linter');
var reporter = require('postcss-reporter');
var pxtorem = require('postcss-pxtorem');

// postcss compailer with plugins
gulp.task('css', function () {
    var processors = [
        normalize,
        postcssImport({
            plugins: [
                mixins(),
                nested(),
                bemLinter(),
                reporter({ throwError: true })
            ]
        }),
        cssnext({ browsers: 'last 2 version, > 1%, ie > 8', url: false }),
        assets({ basePath: 'client/', relativeTo: 'client/css', loadPaths: ['img'], cachebuster: true }),
        extend(),
        pxtorem()
    ];

    return gulp.src('client/css/style.css')
        .pipe(plumber({errorHandler: notify.onError('CSS error: <%= error.message %>')}))
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets/css/'))
        .pipe(livereload());
});

// lint javascript files using jshint
gulp.task('jshint', function () {
    return gulp.src(['client/js/**/*.js', '!client/js/vendor/**/*.js'])
        .pipe(jshint(jshintConfig))
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});

// check javascript code style via jscs
gulp.task('jscs', function () {
    return gulp.src(['client/js/**/*.js', '!client/js/vendor/**/*.js'])
        .pipe(jscs(jscsConfig));
});

// compile javascript files via browserify
gulp.task('browserify', ['jshint'], function () {
    var browserified = function (file, enc, next) {
            browserify({
                entries: file.path,
                debug: true
            }).bundle(function (err, res) {
                file.contents = (typeof res !== 'undefined') ? res : null;
                next(err, file);
            });
    };

    return gulp.src(['client/js/bundles/*.js'])
        .pipe(plumber({errorHandler: notify.onError('Browserify error: <%= error.message %>')}))
        .pipe(sourcemaps.init())
        .pipe(through2.obj(browserified))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets/js/'))
        .pipe(livereload());
});

// optimize images using imagemin
gulp.task('images', function () {
    return gulp.src('client/img/**/*')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('assets/img'));
});

// check package.json for outdated dependencies
gulp.task('david', function () {
    return gulp.src('./package.json')
        .pipe(david({ error404: true, errorDepType: true }))
        .pipe(david.reporter);
});

// update package.json with new versions of dependencies
gulp.task('update', function () {
    return gulp.src('./package.json')
        .pipe(david({ update: true }))
        .pipe(david.reporter)
        .pipe(gulp.dest('./'));
});

// get all todos from code
gulp.task('todos', function () {
    return gulp.src(['client/js/**/*.js'])
        .pipe(todo())
        .pipe(gulp.dest('./'));
});

// minify css
gulp.task('minify', ['css'], function () {
    return gulp.src('assets/css/*.css')
        .pipe(minify({ keepSpecialComments: 0 }))
        .pipe(gulp.dest('assets/css/'));
});

// uglify javascript files
gulp.task('uglify', ['browserify'], function () {
    return gulp.src('assets/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/'));
});

gulp.task('watch', ['css', 'browserify'], function () {
    livereload.listen();
    gulp.watch('client/css/**/*.css', ['css']);
    gulp.watch(['client/js/**/*.js'], ['jshint', 'browserify']);
});

gulp.task('default', ['css', 'jshint', 'browserify']);

// build (images are optimized before they are inlined into CSS)
gulp.task('build', function() {
    runSequence('images', 'minify', 'uglify', function() {});
});
