// Currently only used to build JS Docs because gulp-jsdoc
// cannot read jaguar.conf.json
module.exports = function (grunt) {
    // Inspects package.json and calls loadNpmTasks for each devDependency
    require('load-grunt-tasks')(grunt);

    // grunt task configuration
    grunt.initConfig({
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
            }
        }
    });

    // grunt tasks
    grunt.registerTask('buildJSDocs', [
        'clean:localDocs',
        'jsdoc:dist'
    ]);
};
