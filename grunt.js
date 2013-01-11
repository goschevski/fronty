/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    lint: {
      files: ['grunt.js', 'assets/js/core/*.js', 'assets/js/modules/*.js']
    },

    concat: {
      dist: {
        src: ['assets/js/libs/*.js', 'assets/js/core/app.js', 'assets/js/modules/*.js', 'assets/js/core/main.js'],
        dest: 'assets/js/prod/scripts.js'
      }
    },

    min: {
      dist: {
        src: ['<config:concat.dist.dest>'],
        dest: 'assets/js/prod/scripts.min.js'
      }
    },

    watch: {
      files: '<config:lint.files>',
      tasks: 'lint concat min'
    },

    jshint: {
      options: {
        browser: true,
        latedef: true,
        onevar: true
      },
      globals: {
        jQuery: false
      }
    },

    uglify: {}

  });

  // Default task.
  grunt.registerTask('default', 'lint concat min');

};
