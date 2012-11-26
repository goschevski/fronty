/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    lint: {
      files: ['modules/*.js']
    },

    concat: {
      dist: {
        src: ['libs/*.js', 'modules/*.js', 'main-libs/main.js'],
        dest: 'scripts.js'
      }
    },

    min: {
      dist: {
        src: ['<config:concat.dist.dest>'],
        dest: 'scripts.min.js'
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
        unused: true,
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
