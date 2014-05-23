
var gulp = require('gulp');
require('gulp-grunt')(gulp); // Load Grunt tasks for jsdoc until gulp-jsdoc becomes more legit
var chug = require('gulp-chug');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat-util');
var rename = require('gulp-rename');
var zip = require('gulp-zip');
var es = require('event-stream');
var replace = require('gulp-replace');
var symlink = require('gulp-symlink');
var fs = require('fs');
var taskListing = require('gulp-task-listing');

// Voice navigator dependencies
var nib = require('nib');
var stylus = require('gulp-stylus');
var jade = require('gulp-jade');
var connect = require('gulp-connect');
var fileinclude = require('gulp-file-include');
var jshint = require('gulp-jshint');

var distDirectory = 'dist/';
var srcDirectory = 'src/';
var exampleDirectory = 'example/';
var baseDirOption = {base: './'};
var archiveDirectory = './archive/';

// Bower version used to version files
var bowerVersion = '';
var versionedMindMeldName = '';
var versionedMinifiedMindMeldName = '';

// -------------------------- Mindmeld.js Tasks -------------------------- //
var distMMDirectory = distDirectory + 'sdk/';
var srcMMDirectory = srcDirectory + 'sdk/';

gulp.task('buildMM', function () {
    gulp.src([
        srcMMDirectory + 'vendor/faye.js',
        srcMMDirectory + 'main.js'
    ])
        .pipe(concat('mindmeld.js'))
        .pipe(gulp.dest(distMMDirectory));
});



// Uglifies mindmeld.js into mindmeld.min.js
gulp.task('uglifyMM', ['buildMM'], function () {
    return gulp.src(distMMDirectory + 'mindmeld.js')
        .pipe(uglify(), {mangle:true})
        .pipe(rename('mindmeld.min.js'))
        .pipe(gulp.dest(distMMDirectory));
});

// Moves generated JS Doc, mindmeld.js, mindmeld.min.js and
// HelloWorld page into mindmeld-js-sdk.zip
gulp.task('zipSDK', ['grunt-buildJSDocs', 'uglifyMM'], function () {
    return es.merge(
        gulp.src('LICENSE'),
        gulp.src(distDirectory + 'docs/**', {base: distDirectory}),
        gulp.src(distMMDirectory + '*.js', {base: distMMDirectory}),
        gulp.src(exampleDirectory + 'sdk/HelloWorld.html', {base: exampleDirectory + 'sdk/'})
    )
        .pipe(zip('mindmeld-js-sdk.zip'))
        .pipe(gulp.dest(distMMDirectory));
});

// Parses bower.json for current version and sets file names
// for mindmeld-<version>.js and mindmeld-<version>.min.js
gulp.task('setVersion', function () {
    var bowerPath = './bower.json';
    var bowerData = JSON.parse(fs.readFileSync(bowerPath, 'utf-8'));
    bowerVersion = bowerData.version;
    versionedMindMeldName = 'mindmeld-' + bowerVersion + '.js';
    versionedMinifiedMindMeldName = 'mindmeld-' + bowerVersion + '.min.js';
});

// Copy mindmeld.js and mindmeld.min.js to archive/ directory
gulp.task('archiveJS', ['setVersion', 'uglifyMM'], function () {
    return es.merge(
        gulp.src(distMMDirectory + 'mindmeld.js', {base: distMMDirectory})
            .pipe(rename(versionedMindMeldName))
            .pipe(gulp.dest(archiveDirectory)),

        gulp.src(distMMDirectory + 'mindmeld.min.js', {base: distMMDirectory})
            .pipe(rename(versionedMinifiedMindMeldName))
            .pipe(gulp.dest(archiveDirectory))
    );
});

// Creates archive of SDK at current version
gulp.task('archiveSDK', ['setVersion', 'archiveJS', 'build'], function () {
    return es.merge(
        gulp.src('LICENSE', baseDirOption),

        gulp.src(distDirectory + 'docs/**', {base: distDirectory}),

        gulp.src([
                archiveDirectory + versionedMindMeldName,
                archiveDirectory + versionedMinifiedMindMeldName
        ], {base: archiveDirectory}),

        gulp.src(exampleDirectory + 'sdk/HelloWorld.html', {base: exampleDirectory + 'sdk/'})
    )
        .pipe(zip(archiveDirectory + 'mindmeld-js-sdk-' + bowerVersion + '.zip'))
        .pipe(gulp.dest('./'));
});

gulp.task('distLoader', function () {
   return gulp.src(srcDirectory + 'loaders/embed.js')
       .pipe(symlink(distDirectory + '/loaders/'));
});

gulp.task('watchMM', ['buildMM'], function () {
    gulp.watch(srcMMDirectory + '**/*.js', ['uglifyMM']);
});

gulp.task('buildSDK', ['zipSDK', 'distLoader']);
// ----------------------------------------------------------------------- //


// ------------------------ Search Widget Tasks ------------------------ //
var srcSearchWidgetDir = 'src/widgets/searchWidget/';
var distSearchWidgetDir = 'dist/widgets/searchWidget/';

gulp.task('buildSearchWidget', ['searchWidgetCSSMin', 'searchWidgetJS']);

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

// --------------------------------------------------------------------- //

// -------------------------- Voice Navigator -------------------------- //

var voiceNavigatorGulpfilePath = './tasks/voiceNavigator.js';

gulp.task('buildVoiceNavigator', function () {
    return gulp.src( voiceNavigatorGulpfilePath, { read: false } )
        .pipe( chug({ tasks: ['build'] }) );
});

gulp.task('watch:voice-navigator', function () {
    return gulp.src( voiceNavigatorGulpfilePath, { read: false } )
        .pipe( chug({ tasks: ['watch'] }) );
});

gulp.task('serve:voice-navigator', function () {
    return gulp.src( voiceNavigatorGulpfilePath, { read: false } )
        .pipe( chug({ tasks: ['serve'] }) );
});

gulp.task('serve:voice-navigator:no-min', function () {
    return gulp.src( voiceNavigatorGulpfilePath, { read: false } )
        .pipe( chug({ tasks: ['serve:no-min'] }) );
});

// --------------------------------------------------------------------- //

// General Tasks
gulp.task('build', ['buildSDK', 'buildSearchWidget', 'buildVoiceNavigator']);
gulp.task('default', ['build']);

// Task to show list of tasks
gulp.task('tasks', taskListing);
