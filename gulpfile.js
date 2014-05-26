
var gulp = require('gulp');
require('gulp-grunt')(gulp); // Load Grunt tasks for jsdoc until gulp-jsdoc becomes more legit
var chug = require('gulp-chug');
var taskListing = require('gulp-task-listing');

// Voice navigator dependencies
var nib = require('nib');
var stylus = require('gulp-stylus');
var jade = require('gulp-jade');
var connect = require('gulp-connect');
var fileinclude = require('gulp-file-include');
var jshint = require('gulp-jshint');


// -------------------------- Mindmeld.js Tasks -------------------------- //
var sdkGulpfilePath = './tasks/sdk.js';

gulp.task('buildSDK', function () {
   return gulp.src(sdkGulpfilePath, {read: false})
       .pipe(chug());
});

gulp.task('archiveSDK', function () {
   return gulp.src(sdkGulpfilePath, {read: false})
       .pipe(chug({tasks: ['archiveSDK']}));
});

gulp.task('uglifyMM', function () {
    return gulp.src(sdkGulpfilePath, {read: false})
        .pipe(chug({tasks: ['uglifyMM']}));
});

// ----------------------------------------------------------------------- //


// ------------------------ Search Widget Tasks ------------------------ //
var searchWidgetGulpfilePath = './tasks/searchWidget.js';

gulp.task('buildSearchWidget', function () {
    return gulp.src(searchWidgetGulpfilePath, {read: false})
        .pipe(chug());
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
