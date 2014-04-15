var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify');


gulp.task('css', function () {
    return gulp.src('assets/css/style.css')
        .pipe(minifycss())
        .pipe(gulp.dest('assets/css/'));
});

gulp.task('js', function () {
    gulp.src('assets/js/pages/*.js')
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/build/'));
});

gulp.task('watch', function() {
    gulp.watch('assets/css/style.css', ['css']);
    gulp.watch(['assets/js/**/*.js', '!assets/js/build/*.js'], ['js']);
});

gulp.task('default', ['css', 'js']);