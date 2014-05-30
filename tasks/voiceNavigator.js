var gulp = require('gulp');

var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat-util');
var rename = require('gulp-rename');
var es = require('event-stream');
var taskListing = require('gulp-task-listing');
var chug = require('gulp-chug');
var replace = require('gulp-replace');

var nib = require('nib');
var stylus = require('gulp-stylus');
var jade = require('gulp-jade');
var connect = require('gulp-connect');

var fileinclude = require('gulp-file-include');
var jshint = require('gulp-jshint');

var voiceNavigator  = (function() {
    var object = {};
    var rootDirectory = '../';
    var sourceVoiceNav = rootDirectory + 'src/widgets/voiceNavigator/';
    object.distVoiceNav = rootDirectory + 'dist/widgets/voiceNavigator/';
    object.sdkGulpfilePath = rootDirectory + 'tasks/sdk.js';
    object.paths = {
        'build.widget.css' : [
                sourceVoiceNav + 'css/widget.styl'
        ],
        'build.widget.js' : [
                sourceVoiceNav + 'js/widget.js'
        ],
        'build.modal.css' : [
                sourceVoiceNav + 'css/vendor/normalize.styl',
                sourceVoiceNav + 'css/modal.styl'
        ],
        'build.modal.js' : [
                sourceVoiceNav + 'js/vendor/jquery-1.10.1.min.js',
                sourceVoiceNav + 'js/vendor/isotope.pkgd.min.js',
                sourceVoiceNav + 'js/vendor/jquery.slimscroll.min.js',
                sourceVoiceNav + 'js/vendor/imagesloaded.pkgd.js',
                sourceVoiceNav + 'js/vendor/jquery.cookie-1.4.0.js',
                sourceVoiceNav + 'js/vendor/lodash.compat.min.js',
                rootDirectory + 'dist/sdk/mindmeld.js',
                sourceVoiceNav + 'js/entityHighlighting.js',
                sourceVoiceNav + 'js/modal.js'
        ],
        'build.modal.img' : [
                sourceVoiceNav + 'img/modal/*'
        ],
        'build.modal.html' : [
                sourceVoiceNav + 'html/modal.jade'
        ],
        'build.modal.audio' : [
                sourceVoiceNav + 'audio/*'
        ]
    };
    object.paths['build.modal.other'] = object.paths['build.modal.img']
        .concat(object.paths['build.modal.audio']);

    return object;
})();

/* Shared functions */
function concatAndMinify(target, type, minify, stream) {
    stream = stream
        .pipe(concat(target + '.' + type))
        .pipe(gulp.dest(voiceNavigator.distVoiceNav + target))
        .pipe(rename(target + '.min.' + type));
    if (target === 'widget' && type === 'js') {
        stream = stream.pipe(replace(/modal\.html/, 'modal.min.html'));
    }
    if (minify) {
        stream = stream
            .pipe((function(type) {
                switch (type) {
                    case 'js':
                        return uglify();
                    case 'css':
                        return minifyCSS();
                    case 'html':
                        return replace(/modal\.(css|js)/g, 'modal.min.$1');
                }
            })(type));
    }
    return stream
        .pipe(gulp.dest(voiceNavigator.distVoiceNav + target))

        .pipe(connect.reload());
}

/* Widget Tasks */
gulp.task('build.widget.css', function() {
    var stream = gulp.src(voiceNavigator.paths['build.widget.css'])
        .pipe(stylus({ errors: true, use: [ nib() ] }));

    return concatAndMinify('widget', 'css', true, stream);
});

gulp.task('build.widget.js', function() {
    var stream = gulp.src(voiceNavigator.paths['build.widget.js'])
        .pipe(fileinclude('@@'));

    return concatAndMinify('widget', 'js', true, stream);
});

gulp.task('build.widget.css.no-min', function() {
    var stream = gulp.src(voiceNavigator.paths['build.widget.css'])
        .pipe(stylus({ errors: true, use: [ nib() ] }));

    return concatAndMinify('widget', 'css', false, stream);
});

gulp.task('build.widget.js.no-min', function() {
    var stream = gulp.src(voiceNavigator.paths['build.widget.js']);

    return concatAndMinify('widget', 'js', false, stream);
});

/* Modal Tasks */

gulp.task('build.modal.css', function() {
    var stream = gulp.src(voiceNavigator.paths['build.modal.css'])
        .pipe(stylus({ errors: true, use: [ nib() ] }));
    return concatAndMinify('modal', 'css', true, stream);
});

gulp.task('build.modal.js', ['buildMM'], function() {
    var stream = gulp.src(voiceNavigator.paths['build.modal.js']);

    return concatAndMinify('modal', 'js', true, stream);
});

gulp.task('build.modal.html', function() {
    var stream = gulp.src(voiceNavigator.paths['build.modal.html'])
        .pipe(jade());

    return concatAndMinify('modal', 'html', true, stream);
});

gulp.task('build.modal.css.no-min', ['buildMM'], function() {
    var stream = gulp.src(voiceNavigator.paths['build.modal.css'])
        .pipe(stylus({ errors: true, use: [ nib() ] }));
    return concatAndMinify('modal', 'css', false, stream);
});

gulp.task('build.modal.js.no-min', function() {
    var stream = gulp.src(voiceNavigator.paths['build.modal.js']);

    return concatAndMinify('modal', 'js', false, stream);
});

gulp.task('build.modal.html.no-min', function() {
    var stream = gulp.src(voiceNavigator.paths['build.modal.html'])
        .pipe(jade());

    return concatAndMinify('modal', 'html', false, stream);
});

gulp.task('build.modal.other', function() {
    var audio = gulp.src(voiceNavigator.paths['build.modal.audio'])
        .pipe(gulp.dest(voiceNavigator.distVoiceNav + 'modal'));

    var img = gulp.src(voiceNavigator.paths['build.modal.img'])
        .pipe(gulp.dest(voiceNavigator.distVoiceNav + 'modal'));

    return es.merge(audio, img);
});

/* Handle all the watching of files */

gulp.task('watch', ['build'], function() {
    var watchLocations = [
        'build.modal.js',
        'build.modal.css',
        'build.modal.html',
        'build.modal.other',
        'build.widget.js',
        'build.widget.css'
    ];

    for (var i = 0; i < watchLocations.length; i++) {
        gulp.watch(voiceNavigator.paths[watchLocations[i]], [ watchLocations[i] ]);
    }
});

// Doesn't minify code
gulp.task('watch.no-min', ['build.no-min'], function() {
    var watchLocations = [
        'build.modal.js',
        'build.modal.css',
        'build.modal.html',
        'build.widget.js',
        'build.widget.css'
    ];

    for (var i = 0; i < watchLocations.length; i++) {
        gulp.watch(voiceNavigator.paths[watchLocations[i]], [ watchLocations[i] + '.no-min' ]);
    }
    gulp.watch(voiceNavigator.paths['build.modal.other'], [ 'build.modal.other' ]);
});

gulp.task('serve', ['watch'], function() {
    connect.server({
        root: '../',
        https: true,
        livereload: false
    });
});
gulp.task('serve.no-min', ['watch.no-min'], function() {
    connect.server({
        root: '../',
        https: true,
        livereload: false
    });
});

gulp.task('serve.livereload', ['watch'], function() {
    connect.server({
        root: '../',
        https: true,
        livereload: true
    });
});

gulp.task('serve.livereload.no-min', ['watch.no-min'], function() {
    connect.server({
        root: '../',
        https: true,
        livereload: true
    });
});

gulp.task('lint', function() {
    return gulp.src([voiceNavigator.path + 'js/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('build'));
});

gulp.task('buildMM', function () {
    return gulp.src(voiceNavigator.sdkGulpfilePath, {read: false})
        .pipe(chug({tasks: ['buildMM']}));
});

// Doesn't minify code
gulp.task('build.no-min', [
    'build.widget.css.no-min', 'build.widget.js.no-min',
    'build.modal.css.no-min', 'build.modal.js.no-min', 'build.modal.html.no-min', 'build.modal.other'
]);


// The default task (called when you run `gulp` from cli)
gulp.task('build', [
    'build.widget.css', 'build.widget.js',
    'build.modal.css', 'build.modal.js', 'build.modal.html', 'build.modal.other'
]);

// Task to show list of tasks
gulp.task('tasks', taskListing);

gulp.task('default', ['build']);
