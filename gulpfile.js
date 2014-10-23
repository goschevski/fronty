var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    compass = require('gulp-compass'),
    imagemin = require('gulp-imagemin'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify');

gulp.task('css', function () {
    gulp.src('sass/style.scss')
        .pipe(plumber())
        .pipe(compass({ config_file: 'config.rb', css: 'assets/css', sass: 'sass' }))
        .pipe(autoprefixer('last 2 version', '> 1%', 'ie 8'));
});

gulp.task('images', function () {
    gulp.src('assets/img/**/*')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('assets/img'));
});

gulp.task('js', function (cb) {
    gulp.src('assets/js/pages/*.js')
        .pipe(plumber())
        .pipe(browserify({ debug: true }))
        .pipe(gulp.dest('assets/js/build/'))
        .on('end', cb);
});

gulp.task('compress', ['js'], function () {
    gulp.src('assets/js/build/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/build/'));
});

gulp.task('watch', ['css', 'js'], function() {
    gulp.watch('sass/**/*.scss', ['css']);
    gulp.watch(['assets/js/**/*.js', '!assets/js/build/*.js'], ['js']);
});

gulp.task('default', ['css', 'js']);
gulp.task('build', ['css', 'compress', 'images']);
