module.exports = function (grunt) {

    // Inspects package.json and calls loadNpmTasks for each devDependency
    require('load-grunt-tasks')(grunt);

    // Monitor grunt execution times
    require('time-grunt')(grunt);

    // grunt task configuration
    grunt.initConfig({
        jsdoc : {
            dist: {
                src: ['mindmeld-2.0.js', 'README.md'],
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
                src: ['./doc', 'mindmeld-2.0.min.js', 'mindmeld-js-sdk.zip']
            }
        },
        uglify: {
            dist: {
                files: [
                    {
                        src: 'mindmeld-2.0.js',
                        dest: 'mindmeld-2.0.min.js'
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
                    'mindmeld-2.0.js',
                    'mindmeld-2.0.min.js',
                    'HelloWorld.html'
                ],
                dest: 'mindmeld-js-sdk.zip'
            }
        },
        watch: {
            docs: {
                files: ['mindmeld-2.0.js', 'docsTemplate/**', 'README.md'],
                tasks: ['docs']
            }
        }
    });

    // grunt tasks
    grunt.registerTask('docs', [
        'clean:localDocs',
        'jsdoc:dist'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'jsdoc:dist',
        'uglify:dist',
        'zip:dist'
    ]);
};
