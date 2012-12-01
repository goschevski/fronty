/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    lint: {
      files: ['grunt.js', 'main/appModule.js', 'main/main.js', 'modules/*.js']
    },

    concat: {
      dist: {
        src: ['libs/*.js', 'main/appModule.js', 'modules/*.js', 'main/main.js'],
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
