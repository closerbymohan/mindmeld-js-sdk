var gulp = require('gulp');
var concat = require('gulp-concat-util');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var taskListing = require('gulp-task-listing');

var rootDirectory = __dirname + '/../../';
var distDirectory = rootDirectory + 'dist/';
var srcDirectory = rootDirectory + 'src/';
var distMMDirectory = distDirectory + 'sdk/';
var srcSearchWidgetDir = srcDirectory + 'widgets/searchWidget/';
var distSearchWidgetDir = distDirectory + 'widgets/searchWidget/';

// TODO: refactor this without 'no-min' tasks

// Generates standalone search widget into dist/widgets/searchWidget
gulp.task('sw.js', ['sdk.uglify', 'sw.uglify'], function () {
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

gulp.task('sw.js.no-min', ['sdk.js'], function () {
    return gulp.src([
            srcSearchWidgetDir + 'js/util/vendorHeader.js',
            srcSearchWidgetDir + 'js/vendor/jquery.min.js',
            srcSearchWidgetDir + 'js/vendor/jquery-ui-autocomplete.min.js',
            srcSearchWidgetDir + 'js/util/vendorFooter.js',
            srcSearchWidgetDir + 'js/util/mmHeader.js',
            distMMDirectory + 'mindmeld.js',
            srcSearchWidgetDir + 'js/jquery.mindmeld-searchwidget.js',
            srcSearchWidgetDir + 'js/util/mmFooter.js'
    ])
        .pipe(concat('mindmeldSearchWidget.js'))
        .pipe(gulp.dest(distSearchWidgetDir));
});

gulp.task('sw.copy', function () {
    return gulp.src(srcSearchWidgetDir + 'js/jquery.mindmeld-searchwidget.js')
       .pipe(gulp.dest(distSearchWidgetDir));
});

// Uglifies search widget
gulp.task('sw.uglify', function () {
    return gulp.src(srcSearchWidgetDir + 'js/jquery.mindmeld-searchwidget.js')
        .pipe(uglify(), {mangle: true})
        .pipe(rename('jquery.mindmeld-searchwidget.min.js'))
        .pipe(gulp.dest(distSearchWidgetDir))
});

// Compiles search widget's SASS into CSS
gulp.task('sw.css.no-min', function () {
    return gulp.src(srcSearchWidgetDir + 'sass/main.scss')
        .pipe(sass())
        .pipe(rename('mindmeldSearchWidget.css'))
        .pipe(gulp.dest(distSearchWidgetDir));
});

// Minifies search widget's CSS
gulp.task('sw.css', ['sw.css.no-min'], function () {
    return gulp.src(distSearchWidgetDir + 'mindmeldSearchWidget.css')
        .pipe(minifyCSS())
        .pipe(rename('mindmeldSearchWidget.min.css'))
        .pipe(gulp.dest(distSearchWidgetDir));
});

// Watches search widget SASS files
gulp.task('sw.watch.css', ['sw.css'], function () {
    gulp.watch(srcSearchWidgetDir + 'sass/**', ['sw.css']);
});

// Watches search widget JS files
gulp.task('sw.watch.js', ['sw.js'], function () {
    gulp.watch([
            srcSearchWidgetDir + 'js/**',
            srcDirectory + 'sdk/main.js',
    ], ['sw.js']);
});

// Watches search widget JS files and compiles un-minified standalone
// search widget
gulp.task('sw.watch.js.no-min', ['sw.js.no-min'], function () {
    gulp.watch([
            srcSearchWidgetDir + 'js/**',
            srcDirectory + 'sdk/main.js',
    ], ['sw.js.no-min']);
});

gulp.task('sw.build', ['sw.js', 'sw.copy', 'sw.css']);
gulp.task('sw', ['sw.build']);

// show list of search widget tasks
gulp.task('sw.tasks', taskListing.withFilters(/\./, /^(?!sw).+/));
