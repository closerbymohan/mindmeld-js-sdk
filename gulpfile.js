
var gulp = require('gulp');
require('gulp-grunt')(gulp); // Load Grunt tasks for jsdoc until gulp-jsdoc becomes more legit
var taskListing = require('gulp-task-listing');


// -------------------------- Mindmeld.js Tasks -------------------------- //
require('./tasks/sdk');

gulp.task('buildSDK', ['sdk']);

gulp.task('archiveSDK', ['archive']);

gulp.task('uglifyMM', ['sdk.uglify']);

// ----------------------------------------------------------------------- //


// ------------------------ Search Widget Tasks ------------------------ //
require('./tasks/searchWidget');

gulp.task('buildSearchWidget', [ 'sw.build']);

// --------------------------------------------------------------------- //


// -------------------------- Voice Navigator -------------------------- //
require('./tasks/voiceNavigator');

gulp.task('buildVoiceNavigator', ['vn.build']);

// --------------------------------------------------------------------- //

// General Tasks
gulp.task('archive', ['sdk.archive', 'sw.build', 'vn.build']);
gulp.task('build', ['sdk.build', 'sw.build', 'vn.build']);
gulp.task('default', ['build']);

// Task to show list of tasks
gulp.task('tasks', taskListing.withFilters(/\./));
