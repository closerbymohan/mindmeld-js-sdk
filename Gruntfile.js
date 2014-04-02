module.exports = function (grunt) {

    // Inspects package.json and calls loadNpmTasks for each devDependency
    require('load-grunt-tasks')(grunt);

    // Monitor grunt execution times
    require('time-grunt')(grunt);

    // grunt task configuration
    grunt.initConfig({
        exec: {
            jsdoc: {
                cmd: 'jsdoc mindmeld-2.0.js README.md -d doc/ -c docsTemplate/jaguar.conf.json -t docsTemplate/jaguarjs-doc'
            }
        },
        clean: {
            localDocs: {
              src: ['./doc']
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
                dest: 'mindmeld-js-sdk-2.0.zip'
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
        'exec:jsdoc'
    ]);

    grunt.registerTask('build', [
        'clean',
        'exec:jsdoc',
        'uglify:dist',
        'zip:dist'
    ]);
};
