module.exports = function (grunt) {

    // Inspects package.json and calls loadNpmTasks for each devDependency
    require('load-grunt-tasks')(grunt);

    // Monitor grunt execution times
    require('time-grunt')(grunt);

    // grunt task configuration
    grunt.initConfig({
        jsdoc : {
            dist: {
                src: ['mindmeld.js', 'README.md'],
                dest: 'doc/',
                options: {
                    configure: 'docsTemplate/jaguar.conf.json',
                    template: 'docsTemplate/jaguarjs-doc',
                    private: false
                }
            }
        },
        clean: {
            localDocs: {
              src: ['./doc']
            },
            dist: {
                src: ['./doc', 'mindmeld.min.js', 'mindmeld-js-sdk.zip']
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
            }
        },
        zip: {
            dist: {
                src: [
                    'mindmeld.js',
                    'mindmeld.min.js',
                    'HelloWorld.html'
                ],
                dest: 'mindmeld-js-sdk.zip'
            }
        },
        watch: {
            docs: {
                files: ['mindmeld.js', 'docsTemplate/**', 'README.md'],
                tasks: ['docs']
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'mindmeld.js'],
            jshintrc: true
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
        'zip:dist'
    ]);
};
