var gulp = require('gulp');
var rename = require('gulp-rename');
var jshintConfig = require('./package').jshintConfig;
var stylish = require('jshint-stylish');
var jshint = require('gulp-jshint');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var minify = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
var svgspritesheet = require('gulp-svg-spritesheet');
var svgo = require('gulp-svgo');
var svg2png = require('gulp-svg2png');
var imagemin = require('gulp-imagemin');
var jscsConfig = require('./package').jscs;
var jscs = require('gulp-jscs');
var through2 = require('through2');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var base64 = require('gulp-base64-inline');
var david = require('gulp-david');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('css', ['iconfont', 'sprite'], function () {
    return gulp.src('sass/style.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(base64('../assets/img'))
        .pipe(autoprefixer('last 2 version', '> 1%'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets/css/'));
});

gulp.task('iconfont', function () {
    return gulp.src(['assets/img/iconfont/*.svg'])
        .pipe(iconfont({ fontName: 'iconfont', normalize: true }))
        .on('codepoints', function (codepoints, options) {
            gulp.src('sass/templates/_iconfont-template.scss')
                .pipe(consolidate('lodash', {
                    icons: codepoints,
                    fontName: 'iconfont',
                    fontPath: '../fonts/iconfont/'
                }))
                .pipe(rename('_iconfont-map.scss'))
                .pipe(gulp.dest('sass/generated/'));
        })
        .pipe(gulp.dest('assets/fonts/iconfont/'));
});

gulp.task('svgSprite', function () {
    return gulp.src('assets/img/sprites/*')
        .pipe(plumber())
        .pipe(svgo())
        .pipe(svgspritesheet({
            padding: 5,
            positioning: 'packed',
            templateSrc: 'sass/templates/_sprite-template.scss',
            templateDest: 'sass/generated/_sprite-map.scss'
        }))
        .pipe(gulp.dest('assets/img/sprite.svg'));
});

gulp.task('pngSprite', ['svgSprite'], function () {
    return gulp.src('assets/img/sprite.svg')
        .pipe(svg2png())
        .pipe(gulp.dest('assets/img/'));
});

gulp.task('sprite', ['pngSprite']);

gulp.task('jshint', function () {
    return gulp.src(['assets/js/**/*.js', '!assets/js/build/*.js'])
        .pipe(jshint(jshintConfig))
        .pipe(jshint.reporter(stylish));
});

gulp.task('jscs', function () {
    return gulp.src(['assets/js/**/*.js', '!assets/js/build/*.js'])
        .pipe(jscs(jscsConfig));
});

gulp.task('browserify', ['jshint'], function () {
    var browserified = function (file, enc, next) {
        browserify(file.path)
            .bundle(function (err, res) {
                file.contents = res;
                next(null, file);
            });
    };

    return gulp.src('assets/js/bundles/*.js')
        .pipe(sourcemaps.init())
        .pipe(through2.obj(browserified))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets/js/build/'));
});

gulp.task('images', function () {
    return gulp.src('assets/img/**/*')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('assets/img'));
});

gulp.task('checkDependencies', function () {
  return gulp.src('../package.json')
    .pipe(david({ error404: true, errorDepType: true }))
    .pipe(david.reporter);
});

gulp.task('updateManifest', function () {
  return gulp.src('../package.json')
    .pipe(david({ update: true }))
    .pipe(david.reporter)
    .pipe(gulp.dest('../'));
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
    gulp.watch(['assets/js/**/*.js', '!assets/js/build/*.js'], ['jshint', 'browserify']);
});

gulp.task('default', ['css', 'jshint', 'browserify']);
gulp.task('build', ['minify', 'uglify', 'images']);
