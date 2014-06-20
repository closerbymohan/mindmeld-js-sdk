
var gulp = require('gulp');
require('gulp-grunt')(gulp); // Load Grunt tasks for jsdoc until gulp-jsdoc becomes more legit
var taskListing = require('gulp-task-listing');
var connect = require('gulp-connect');


// -------------------------- Mindmeld.js Tasks -------------------------- //
require('./gulp/tasks/sdk');

gulp.task('buildSDK', ['sdk']);
gulp.task('archiveSDK', ['archive']);
gulp.task('uglifyMM', ['sdk.uglify']);

// ----------------------------------------------------------------------- //


// ------------------------ Search Widget Tasks ------------------------ //
require('./gulp/tasks/searchWidget');

gulp.task('buildSearchWidget', [ 'sw.build']);

// --------------------------------------------------------------------- //


// -------------------------- Voice Navigator -------------------------- //
require('./gulp/tasks/voiceNavigator');

gulp.task('buildVoiceNavigator', ['vn.build']);

// --------------------------------------------------------------------- //

// General Tasks
gulp.task('archive', ['sdk.archive', 'sw.build', 'vn.build']);
gulp.task('build', ['sdk.build', 'sw.build', 'vn.build']);
gulp.task('default', ['build']);

gulp.task('serve.no-build', function() {
    connect.server({
        root: __dirname,
        https: true,
        livereload: false
    });
});

// serve the repo to view examples
gulp.task('serve', function() {
    connect.server({
        https: true,
        livereload: false
    });
});

gulp.task('serve.livereload', function() {
    connect.server({
        https: true,
        livereload: true
    });
});

// Task to show list of tasks
gulp.task('tasks', taskListing.withFilters(/\./));

