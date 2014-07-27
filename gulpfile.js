var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    compass = require('gulp-compass'),
    minifycss = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify');


gulp.task('css', function () {
    gulp.src('sass/style.scss')
        .pipe(compass({ config_file: 'config.rb', css: 'assets/css', sass: 'sass' }))
        .pipe(autoprefixer('last 2 version', '> 1%', 'ie 8'))
        .pipe(minifycss())
        .pipe(gulp.dest('assets/css/'));
});

gulp.task('images', function () {
    gulp.src('assets/img/**/*')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('assets/img'));
});

gulp.task('js', function () {
    gulp.src('assets/js/pages/*.js')
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/build/'));
});

gulp.task('watch', function() {
    gulp.watch('sass/**/*.scss', ['css']);
    gulp.watch(['assets/js/**/*.js', '!assets/js/build/*.js'], ['js']);
});

gulp.task('default', ['css', 'js']);
gulp.task('build', ['css', 'js', 'images']);
