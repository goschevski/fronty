var gulp = require('gulp');
var merge = require('merge-stream');
var plumber = require('gulp-plumber');
var minify = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var compass = require('gulp-compass');
var imagemin = require('gulp-imagemin');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');

gulp.task('css', function () {
    gulp.src('sass/style.scss')
        .pipe(plumber())
        .pipe(compass({ config_file: 'config.rb', css: 'assets/css', sass: 'sass' }))
        .pipe(autoprefixer('last 2 version', '> 1%', 'ie 8'));
});

gulp.task('js', function () {
    gulp.src('assets/js/pages/*.js')
        .pipe(plumber())
        .pipe(browserify({ debug: true }))
        .pipe(gulp.dest('assets/js/build/'));
});

gulp.task('images', function () {
    gulp.src('assets/img/**/*')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('assets/img'));
});

gulp.task('compress', function () {
    var css = gulp.src('assets/css/*.css').pipe(minify({ keepSpecialComments: 0 })).pipe(gulp.dest('assets/css/'));
    var js = gulp.src('assets/js/build/*.js').pipe(uglify()) .pipe(gulp.dest('assets/js/build/'));
    return merge(css, js);
});

gulp.task('watch', ['css', 'js'], function () {
    gulp.watch('sass/**/*.scss', ['css']);
    gulp.watch(['assets/js/**/*.js', '!assets/js/build/*.js'], ['js']);
});

gulp.task('default', ['css', 'js']);
gulp.task('build', ['compress', 'images']);
