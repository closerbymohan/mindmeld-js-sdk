/* bundleLogger
   ------------
   Provides gulp style logs to the bundle method in browserify.js
*/

var gutil        = require('gulp-util');
var prettyHrtime = require('pretty-hrtime');
var startTime;
var task;

function getTaskName(target) {
    var taskName = 'bundle';
    if (typeof target === 'string' && target.length) {
        taskName += ' ' + target;
    }
    return taskName;
}

module.exports = function BundleLogger(target) {
    var self = this;
    self.task = getTaskName(target);
    self.start = function() {
        self.startTime = process.hrtime();
        gutil.log('Running', gutil.colors.green("'" + self.task + "'") + '...');
    };

    self.end = function() {
        var taskTime = process.hrtime(self.startTime);
        var prettyTime = prettyHrtime(taskTime);
        gutil.log('Finished', gutil.colors.green("'" + self.task + "'"), 'in', gutil.colors.magenta(prettyTime));
    };

    return this;
};