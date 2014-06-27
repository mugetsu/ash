/*!
 * ASH Grunfile based on FireShell
 * http://getfireshell.com
 * @author Todd Motto
 */

'use strict';

/**
 * Livereload and connect variables
 */
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({
  port: LIVERELOAD_PORT
});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

/**
 * Grunt module
 */
module.exports = function (grunt) {

  /**
   * Dynamically load npm tasks
   */
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  /**
   * ASH Grunt config
   */
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    /**
     * Set project info
     */
    project: {
      src: 'src',
      app: 'app',
      assets: '<%= project.app %>/assets',
      css: [
        '<%= project.src %>/scss/style.scss'
      ],
      js: [
        '<%= project.src %>/js/*.js'
      ]
    },

    /**
     * Project banner
     * Dynamically appended to CSS/JS files
     * Inherits text from package.json
     */
    tag: {
      banner: '/*!\n' +
              ' * <%= pkg.name %>\n' +
              ' * <%= pkg.title %>\n' +
              ' * <%= pkg.url %>\n' +
              ' * @author <%= pkg.author %>\n' +
              ' * @version <%= pkg.version %>\n' +
              ' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' +
              ' */\n\n'
    },

    /**
     * Connect port/livereload
     * https://github.com/gruntjs/grunt-contrib-connect
     * Starts a local webserver and injects
     * livereload snippet
     */
    connect: {
      options: {
        port: 9000,
        hostname: '*'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [lrSnippet, mountFolder(connect, 'app')];
          }
        }
      }
    },

    /**
     * JSHint
     * https://github.com/gruntjs/grunt-contrib-jshint
     * Manage the options inside .jshintrc file
     */
    jshint: {
      files: ['src/js/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    /**
     * Concatenate JavaScript files
     * https://github.com/gruntjs/grunt-contrib-concat
     * Imports all .js files and appends project banner
     */
    concat: {
      dev: {
        files: {
          '<%= project.assets %>/js/scripts.min.js': '<%= project.js %>'
        }
      },
      options: {
        stripBanners: true,
        nonull: true,
        banner: '<%= tag.banner %>'
      }
    },

    /**
     * Uglify (minify) JavaScript files
     * https://github.com/gruntjs/grunt-contrib-uglify
     * Compresses and minifies all JavaScript files into one
     */
    uglify: {
      options: {
        banner: "<%= tag.banner %>"
      },
      dist: {
        files: {
          '<%= project.assets %>/js/scripts.min.js': '<%= project.js %>'
        }
      }
    },

    /**
     * Compile Sass/SCSS files
     * https://github.com/gruntjs/grunt-contrib-sass
     * Compiles all Sass/SCSS files and appends project banner
     */
    sass: {
      dev: {
        options: {
          style: 'expanded',
          banner: '<%= tag.banner %>'
        },
        files: {
          '<%= project.assets %>/css/style.min.css': '<%= project.css %>'
        }
      },
      dist: {
        options: {
          style: 'compressed',
          banner: '<%= tag.banner %>'
        },
        files: {
          '<%= project.assets %>/css/style.min.css': '<%= project.css %>'
        }
      }
    },

    /**
     * Include Replace
     * https://github.com/alanshaw/grunt-include-replace
     * Grunt task to include files and replace variables. Allows for parameterised includes
     */
    includereplace: {
      multisrcdest: {
        options: {
          globals: {title: 'ABS-CBN'}
        },
        files: {
          'app': 'src/templates/pages/*.html'
        }
      },
    },

    /**
     * Prettify
     * https://github.com/jonschlinkert/grunt-prettify
     * HTML prettifier with a number of options for formatting HTML the way you like it
     */
    prettify: {
      jsbeautifyrc: {
        options: {
          config: '.jsbeautifyrc'
        },
        files: [
          { expand: true, cwd: '<%= project.app %>', src: ['*.html'], dest: 'app', ext: '.html' }
        ]
      }
    },

    /**
     * Wiredep
     * https://github.com/stephenplusplus/grunt-wiredep
     * Inject Bower packages into your source code with Grunt
     */
    wiredep: {
      dev: {
        src: ['app/*.html'],
        cwd: '',
        dependencies: true,
        devDependencies: false,
        exclude: [],
        fileTypes: {},
        ignorePath: [
          "**/.*",
          "node_modules",
          "bower_components",
          "test",
          "tests"
        ],
        overrides: {
          "jquery": {
            "main": "dist/jquery.min.js"
          }
        }
      }
    },

    /**
     * Spritesmith
     * https://github.com/Ensighten/grunt-spritesmith
     * Grunt task for converting a set of images into a spritesheet and corresponding CSS variables
     */
    sprite: {
      all: {
        src: 'src/images/sprite/*.png',
        destImg: '<%= project.assets %>/img/spritesheet.png',
        destCSS: 'src/scss/modules/sprites.scss'
      }
    },

    /**
     * Opens the web server in the browser
     * https://github.com/jsoverson/grunt-open
     */
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    },

    /**
     * Runs tasks against changed watched files
     * https://github.com/gruntjs/grunt-contrib-watch
     * Watching development files and run concat/compile tasks
     * Livereload the browser once complete
     */
    watch: {
      concat: {
        files: '<%= project.src %>/js/{,*/}*.js',
        tasks: ['concat:dev', 'jshint']
      },
      sass: {
        files: '<%= project.src %>/scss/{,*/}*.{scss,sass}',
        tasks: ['sass:dev']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '<%= project.app %>/{,*/}*.html',
          '<%= project.assets %>/css/*.css',
          '<%= project.assets %>/js/{,*/}*.js',
          '<%= project.assets %>/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    }
  });

  /**
   * Default task
   * Run `grunt` on the command line
   */
  grunt.registerTask('default', [
    'includereplace',
    'prettify',
    'sass:dev',
    'jshint',
    'sprite',
    'concat:dev',
    'wiredep:dev',
    'connect:livereload',
    'open',
    'watch'
  ]);

  /**
   * Build task
   * Run `grunt build` on the command line
   * Then compress all JS/CSS files
   */
  grunt.registerTask('build', [
    'sass:dist',
    'jshint',
    'uglify'
  ]);

};
