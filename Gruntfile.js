module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        concat: {
            dist: {
                src: ['assets/js/libs/*.js', 'assets/js/core/*.js', 'assets/js/views/*.js', 'assets/js/vendor/main.js'],
                dest: 'assets/js/prod/scripts.js'
            }
        },

        uglify: {
            project_production: {
                files: {
                    'assets/js/prod/scripts.min.js': ['assets/js/prod/scripts.js']
                }
            }
        },

        watch: {
            files: ['assets/js/libs/*.js', 'assets/js/core/*.js', 'assets/js/views/*.js', 'assets/js/vendor/main.js'],
            tasks: ['concat', 'uglify']
        }

    });

    // Default task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['concat', 'uglify']);

};
