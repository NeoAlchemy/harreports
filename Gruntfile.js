module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            compile: {
                options: {
                    baseUrl: "harreport/app/js",
                    name: 'lib/require/almond',
                    include: ['main'],
                    insertRequire: ['main'],
                    optimize: 'none',
                    findNestedDependencies: true,
                    preserveLicenseComments: false,
                    paths: {
                        angular: 'lib/angular/angular'
                    },
                    shim: {
                        'angular' : {'exports' : 'angular'}
                    },
                    out: "harreport/app/js/optimized.js"
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    // Default task(s).
    grunt.registerTask('default', ['requirejs']);

};
