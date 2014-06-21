// Currently only used to build JS Docs because gulp-jsdoc
// cannot read jaguar.conf.json
module.exports = function (grunt) {
    // Inspects package.json and calls loadNpmTasks for each devDependency
    require('load-grunt-tasks')(grunt);

    // grunt task configuration
    grunt.initConfig({
        jsdoc : {
            dist: {
                src: ['src/sdk/main.js', 'README.md', 'src/widgets/voiceNavigator/js/widget.js'],
                dest: 'dist/docs/',
                options: {
                    configure: 'src/docsTemplate/jaguar.conf.json',
                    template: 'src/docsTemplate/jaguarjs-doc',
                    private: false
                }
            }
        },
        clean: {
            localDocs: {
                src: ['dist/docs']
            }
        }
    });

    // grunt tasks
    grunt.registerTask('buildJSDocs', [
        'clean:localDocs',
        'jsdoc:dist'
    ]);
};
