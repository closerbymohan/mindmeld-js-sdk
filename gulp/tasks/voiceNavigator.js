var gulp = require('gulp');

var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat-util');
var rename = require('gulp-rename');
var es = require('event-stream');
var taskListing = require('gulp-task-listing');
var replace = require('gulp-replace');

var nib = require('nib');
var stylus = require('gulp-stylus');
var jade = require('gulp-jade');
var connect = require('gulp-connect');

var jshint = require('gulp-jshint');

var browserify   = require('browserify');
var buffer       = require('vinyl-buffer');
var source       = require('vinyl-source-stream');
var bundleLogger = require('../util/bundleLogger');
var handleErrors = require('../util/handleErrors');

var relativePath = 'widgets/voiceNavigator/';
var voiceNavigator = (function() {
    var object = {};
    var rootDirectory = __dirname + '/../../';
    var sourceVoiceNav = rootDirectory + 'src/' + relativePath;
    object.distVoiceNav = rootDirectory + 'dist/' + relativePath;
    object.paths = {
        'vn.widget.css' : [
                sourceVoiceNav + 'css/widget.styl'
        ],
        'vn.widget.js' : [
                sourceVoiceNav + 'js/widget.js'
        ],
        'vn.modal.css.modal' : [
                sourceVoiceNav + 'css/vendor/normalize.styl',
                sourceVoiceNav + 'css/modal/modal.styl'
        ],
        'vn.modal.css.cards' : [
                sourceVoiceNav + 'css/modal/cards.styl'
        ],
        'vn.modal.js' : [
            sourceVoiceNav + 'js/modal.js'
        ],
        'vn.modal.img' : [
                sourceVoiceNav + 'img/modal/*'
        ],
        'vn.modal.html' : [
                sourceVoiceNav + 'html/modal.jade'
        ],
        'vn.modal.audio' : [
                sourceVoiceNav + 'audio/*'
        ]
    };
    object.paths['vn.modal.css'] = object.paths['vn.modal.css.modal']
        .concat(object.paths['vn.modal.css.cards']);
    object.paths['vn.modal.other'] = object.paths['vn.modal.img']
        .concat(object.paths['vn.modal.audio']);

    return object;
})();

/* Shared functions */
function genericBundle(stream, name, type) {
    switch (type) {
        case 'js':
            return browserifyTask(name);
        default:
            return stream.pipe(concat(name + '.' + type));
    }
}

function genericMinify(type) {
    switch (type) {
        case 'js':
            return uglify();
        case 'css':
            return minifyCSS();
        case 'html':
        default:
            return replace(/(modal|cards)\.(css|js)/g, '$1.min.$2');
    }
}

function bundleAndMinify(stream, name, type, directory) {
    directory = directory || name;
    stream = genericBundle(stream, name, type)
        .pipe(gulp.dest(voiceNavigator.distVoiceNav + directory))
        .pipe(rename(name + '.min.' + type));
    if (name === 'widget' && directory === 'widget' && type === 'js') {
         stream = stream.pipe(replace(/modal\.html/g, 'modal.min.html'));
    }
    return stream
        .pipe(genericMinify(type))
        .pipe(gulp.dest(voiceNavigator.distVoiceNav + directory))

        .pipe(connect.reload());
}

/* Widget Tasks */
gulp.task('vn.widget.css', function() {
    var stream = gulp.src(voiceNavigator.paths['vn.widget.css'])
        .pipe(stylus({ errors: true, use: [ nib() ] }));

    return bundleAndMinify(stream, 'widget', 'css');
});

function browserifyTask(target) {
    var task = 'vn.' + target + '.js';

    var bundler = browserify({
        entries: voiceNavigator.paths[task]
    });

    var bundle = function() {
        var logger = new bundleLogger(target);
        logger.start();
        return bundler
            .transform('config/' + relativePath + 'shim', 'browserify-shim')
            .bundle({ debug: true})
            .on('error', handleErrors)
            .on('end', logger.end)
            .pipe(source(target + '.js'))
            .pipe(buffer());
    };

    return bundle();
}

gulp.task('vn.widget.js', function() {
    return bundleAndMinify(null, 'widget', 'js');
});

/* Modal Tasks */

gulp.task('vn.modal.css.cards', function() {
    var stream = gulp.src(voiceNavigator.paths['vn.modal.css.cards'])
        .pipe(stylus({ errors: true, use: [ nib() ] }));
    return bundleAndMinify(stream, 'cards', 'css', 'modal');
});

gulp.task('vn.modal.css.modal', function() {
    var stream = gulp.src(voiceNavigator.paths['vn.modal.css.modal'])
        .pipe(stylus({ errors: true, use: [ nib() ] }));
    return bundleAndMinify(stream, 'modal', 'css');
});

gulp.task('vn.modal.css', ['vn.modal.css.modal', 'vn.modal.css.cards']);

gulp.task('vn.modal.js', ['sdk.concat'], function() {
    return bundleAndMinify(null, 'modal', 'js');
});

gulp.task('vn.modal.html', function() {
    var stream = gulp.src(voiceNavigator.paths['vn.modal.html'])
        .pipe(jade());

    return bundleAndMinify(stream, 'modal', 'html');
});

gulp.task('vn.modal.other', function() {
    var audio = gulp.src(voiceNavigator.paths['vn.modal.audio'])
        .pipe(gulp.dest(voiceNavigator.distVoiceNav + 'modal'));

    var img = gulp.src(voiceNavigator.paths['vn.modal.img'])
        .pipe(gulp.dest(voiceNavigator.distVoiceNav + 'modal'));

    return es.merge(audio, img);
});

/* Handle all the watching of files */

gulp.task('vn.watch', ['vn.build'], function() {
    var watchLocations = [
        'vn.modal.js',
        'vn.modal.css',
        'vn.modal.html',
        'vn.modal.other',
        'vn.widget.js',
        'vn.widget.css'
    ];

    for (var i = 0; i < watchLocations.length; i++) {
        gulp.watch(voiceNavigator.paths[watchLocations[i]], [ watchLocations[i] ]);
    }
});

gulp.task('vn.serve', ['vn.watch'], function() {
    connect.server({
        root: __dirname + '/../../',
        https: true,
        livereload: false
    });
});

gulp.task('vn.serve.livereload', ['vn.watch'], function() {
    connect.server({
        root: __dirname + '/../../',
        https: true,
        livereload: true
    });
});

gulp.task('vn.lint', function() {
    return gulp.src([voiceNavigator.path + 'js/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// aliases
gulp.task('vn.widget', ['vn.widget.css', 'vn.widget.js']);
gulp.task('vn.modal', ['vn.modal.css', 'vn.modal.js', 'vn.modal.html', 'vn.modal.other']);
gulp.task('vn.build', ['vn.widget', 'vn.modal']);
gulp.task('vn', ['vn.build']);

// show list of voice navigator tasks
gulp.task('vn.tasks', taskListing.withFilters(/\./, /^(?!vn).+/));