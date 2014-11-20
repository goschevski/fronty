var jshintConfig = require('./package').jshintConfig;
var stylish = require('jshint-stylish');
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var minify = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
// var sass = require('gulp-sass');
var sass = require('gulp-ruby-sass');
var svgSprites = require('gulp-svg-sprites');
var svgo = require('gulp-svgo');
var svg2png = require('gulp-svg2png');
var imagemin = require('gulp-imagemin');
var browserify = require('gulp-browserify');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');

gulp.task('css', function () {
    return gulp.src('sass/style.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer('last 2 version', '> 1%'))
        .pipe(gulp.dest('assets/css/'));
});

gulp.task('svgSprite', function () {
    return gulp.src('assets/img/sprites/*')
        .pipe(svgo())
        .pipe(svgSprites({
            cssFile: '../../sass/core/_sprite-maps.scss',
            preview: false,
            layout: 'horizontal',
            padding: 5,
            svg: { sprite: 'sprite.svg' },
            templates: { css: require('fs').readFileSync('sass/core/_sprite-template.scss', 'utf-8') }
        }))
        .pipe(gulp.dest('assets/img/'));
});

gulp.task('pngSprite', ['svgSprite'], function () {
    return gulp.src('assets/img/sprite.svg')
        .pipe(svg2png())
        .pipe(gulp.dest('assets/img/'));
});

gulp.task('sprite', ['pngSprite']);

gulp.task('browserify', function () {
    return gulp.src('assets/js/pages/*.js')
        .pipe(plumber())
        .pipe(jshint(jshintConfig))
        .pipe(jshint.reporter(stylish))
        .pipe(browserify({ debug: true }))
        .pipe(gulp.dest('assets/js/build/'));
});

gulp.task('images', function () {
    return gulp.src('assets/img/**/*')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('assets/img'));
});

gulp.task('minify', ['sprite', 'css'], function () {
    return gulp.src('assets/css/*.css')
        .pipe(minify({ keepSpecialComments: 0 }))
        .pipe(gulp.dest('assets/css/'));
});

gulp.task('uglify', ['browserify'], function () {
    return gulp.src('assets/js/build/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/build/'));
});

gulp.task('watch', ['css', 'browserify'], function () {
    gulp.watch('assets/img/sprites/*', ['sprite']);
    gulp.watch('sass/**/*.scss', ['css']);
    gulp.watch(['assets/js/**/*.js', '!assets/js/build/*.js'], ['browserify']);
});

gulp.task('default', ['css', 'browserify']);
gulp.task('build', ['minify', 'uglify', 'images']);
