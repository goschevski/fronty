/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    lint: {
      files: ['grunt.js', 'assets/js/core/*.js', 'assets/js/views/*.js', 'assets/js/vendor/main.js']
    },

    concat: {
      dist: {
        src: ['assets/js/libs/*.js', 'assets/js/core/*.js', 'assets/js/views/*.js', 'assets/js/vendor/main.js'],
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
      tasks: 'concat min'
    },

    jshint: {
      options: {
        browser: true,
        latedef: true,
        onevar: false
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
