var gulp = require('gulp');
var concat = require('gulp-concat-util');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var chug = require('gulp-chug');

var rootDirectory = __dirname + '/../';
var distDirectory = rootDirectory + 'dist/';
var srcDirectory = rootDirectory + 'src/';
var distMMDirectory = distDirectory + 'sdk/';
var srcSearchWidgetDir = srcDirectory + 'widgets/searchWidget/';
var distSearchWidgetDir = distDirectory + 'widgets/searchWidget/';

// Generates standalone search widget into dist/widgets/searchWidget
gulp.task('searchWidgetJS', ['uglifyMM', 'uglifySearchWidget'], function () {
    return gulp.src([
            srcSearchWidgetDir + 'js/util/vendorHeader.js',
            srcSearchWidgetDir + 'js/vendor/jquery.min.js',
            srcSearchWidgetDir + 'js/vendor/jquery-ui-autocomplete.min.js',
            srcSearchWidgetDir + 'js/util/vendorFooter.js',
            srcSearchWidgetDir + 'js/util/mmHeader.js',
            distMMDirectory + 'mindmeld.min.js',
            distSearchWidgetDir + 'jquery.mindmeld-searchwidget.min.js',
            srcSearchWidgetDir + 'js/util/mmFooter.js'
    ])
        .pipe(concat('mindmeldSearchWidget.js'))
        .pipe(gulp.dest(distSearchWidgetDir));
});

gulp.task('copySearchWidget', function () {
    var path = srcSearchWidgetDir + 'js/jquery.mindmeld-searchwidget.js';
    console.log(path);
    return gulp.src(srcSearchWidgetDir + 'js/jquery.mindmeld-searchwidget.js')
       .pipe(gulp.dest(distSearchWidgetDir));
});

// Uglifies search widget
gulp.task('uglifySearchWidget', function () {
    return gulp.src(srcSearchWidgetDir + 'js/jquery.mindmeld-searchwidget.js')
        .pipe(uglify(), {mangle: true})
        .pipe(rename('jquery.mindmeld-searchwidget.min.js'))
        .pipe(gulp.dest(distSearchWidgetDir))
});

// Compiles search widget's SASS into CSS
gulp.task('searchWidgetSass', function () {
    return gulp.src(srcSearchWidgetDir + 'sass/main.scss')
        .pipe(sass())
        .pipe(rename('mindmeldSearchWidget.css'))
        .pipe(gulp.dest(distSearchWidgetDir));
});

// Minifies search widget's CSS
gulp.task('searchWidgetCSSMin', ['searchWidgetSass'], function () {
    return gulp.src(distSearchWidgetDir + 'mindmeldSearchWidget.css')
        .pipe(minifyCSS())
        .pipe(rename('mindmeldSearchWidget.min.css'))
        .pipe(gulp.dest(distSearchWidgetDir));
});

// Watches search widget SASS files
gulp.task('watchSearchWidgetStyle', ['searchWidgetCSSMin'], function () {
    gulp.watch(srcSearchWidgetDir + 'sass/**', ['searchWidgetCSSMin']);
});

// Watches search widget JS files
gulp.task('watchSearchWidgetJS', ['searchWidgetJS'], function () {
    gulp.watch(srcSearchWidgetDir + 'js/**', ['searchWidgetJS']);
});

// Uglifies mindmle.js for inclusion
gulp.task('uglifyMM', function () {
    var sdkGulpfilePath = rootDirectory + 'tasks/sdk.js';
   return gulp.src(sdkGulpfilePath, {read: false})
       .pipe(chug({tasks: ['uglifyMM']}));
});

gulp.task('build', ['searchWidgetJS', 'copySearchWidget', 'searchWidgetCSSMin']);
gulp.task('default', ['build']);