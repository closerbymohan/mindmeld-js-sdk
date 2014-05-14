module.exports = function (grunt) {

    // Inspects package.json and calls loadNpmTasks for each devDependency
    require('load-grunt-tasks')(grunt);

    // grunt task configuration
    grunt.initConfig({
        bower: grunt.file.readJSON( "bower.json" ),
        jsdoc : {
            dist: {
                src: ['mindmeld.js', 'README.md'],
                dest: 'docs/',
                options: {
                    configure: 'docsTemplate/jaguar.conf.json',
                    template: 'docsTemplate/jaguarjs-doc',
                    private: false
                }
            }
        },
        clean: {
            localDocs: {
              src: ['./docs']
            },
            dist: {
                src: ['./docs', 'mindmeld.min.js', 'mindmeld-js-sdk.zip']
            },
            archive: {
                src: [ '.archive-temp' ]
            }
        },
        uglify: {
            dist: {
                files: [
                    {
                        src: 'mindmeld.js',
                        dest: 'mindmeld.min.js'
                    }
                ],
                options: {
                    mangle: true
                }
            },
            searchWidget: {
                files: [
                    {
                        src: 'searchWidget/js/jquery.mindmeld-searchwidget.js',
                        dest: 'searchWidget/dist/jquery.mindmeld-searchwidget.min.js'
                    }
                ],
                options: {
                    mangle: true
                }
            }
        },
        zip: {
            dist: {
                src: [
                    'LICENSE',
                    'docs/**',
                    'mindmeld.js',
                    'mindmeld.min.js',
                    'HelloWorld.html'
                ],
                dest: 'mindmeld-js-sdk.zip'
            },
            archive: {
                cwd: '.archive-temp/',
                src: [
                    '.archive-temp/LICENSE',
                    '.archive-temp/docs/**',
                    '.archive-temp/mindmeld-<%= bower.version %>.js',
                    '.archive-temp/mindmeld-<%= bower.version %>.min.js',
                    '.archive-temp/HelloWorld.html'
                ],
                dest: 'archive/mindmeld-js-sdk-<%= bower.version %>.zip'
            }
        },
        copy: {
            archive: {
                files: [
                    { expand: true, src: [ 'LICENSE', 'HelloWorld.html', 'docs/**' ], dest: '.archive-temp/' },
                    { expand: false, src: 'mindmeld.js', dest: '.archive-temp/mindmeld-<%= bower.version %>.js' },
                    { expand: false, src: 'mindmeld.min.js', dest: '.archive-temp/mindmeld-<%= bower.version %>.min.js' },
                    { expand: false, src: 'mindmeld.js', dest: 'archive/mindmeld-<%= bower.version %>.js' },
                    { expand: false, src: 'mindmeld.min.js', dest: 'archive/mindmeld-<%= bower.version %>.min.js' }
                ],
                options: {
                    process: function (content, srcPath) {
                        if (srcPath === 'HelloWorld.html') {
                            var version = grunt.config('bower.version');
                            content = content.replace(/mindmeld\.js/,'mindmeld-' + version + '.js');
                        }

                        return content;
                    }
                }
            },
            searchWidget: {
                src: 'searchWidget/js/jquery.mindmeld-searchwidget.js',
                dest: 'searchWidget/dist/jquery.mindmeld-searchwidget.js'
            }
        },
        watch: {
            docs: {
                files: ['mindmeld.js', 'docsTemplate/**', 'README.md'],
                tasks: ['docs']
            },
            searchWidgetCSS: {
                files: ['searchWidget/sass/*.scss'],
                tasks: ['sass:searchWidget']
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'mindmeld.js'],
            jshintrc: true
        },
        concat: {
            searchWidget: {
                options: {
                    footer: '}(MM.__bootstrap.$jq));'
                },
                src: [
                    'searchWidget/js/vendor.js',
                    'mindmeld.min.js',
                    'searchWidget/dist/jquery.mindmeld-searchwidget.min.js',
                ],
                dest: 'searchWidget/dist/mindmeldSearchWidget.js'
            }
        },
        sass: {
            searchWidget: {
                options: {
                    sourcemap: true
                },
                files: {
                    'searchWidget/css/main.css': 'searchWidget/sass/main.scss'
                }
            }
        },
        cssmin: {
            searchWidget: {
                files: {
                    'searchWidget/dist/mindmeldSearchWidget.min.css': ['searchWidget/css/main.css']
                }
            }
        }
    });

    // grunt tasks
    grunt.registerTask('docs', [
        'clean:localDocs',
        'jsdoc:dist'
    ]);

    grunt.registerTask('build', [
//        'jshint',
        'clean:dist',
        'jsdoc:dist',
        'uglify:dist',
        'zip:dist',
        'buildSearchWidget'
    ]);

    grunt.registerTask('archive', 'Creates an archived copy of the current version.', [
        'build',
        'copy:archive',
        'zip:archive',
        'clean:archive'
    ]);


    grunt.registerTask('buildSearchWidget', 'Builds the MindMeld search widget into searchWidget/dist', [
        'copy:searchWidget',
        'uglify:searchWidget',
        'concat:searchWidget',
        'sass:searchWidget',
        'cssmin:searchWidget'
    ]);

//    grunt.registerTask('bump', 'Increments the version number in all the appropriate places.', []) // TODO:
};
