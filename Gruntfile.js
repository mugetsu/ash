/*!
 * ASH Grunfile
 * @author Randell Quitain
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
        '<%= project.src %>/scripts/*.js'
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
     * Concatenate JavaScript files
     * https://github.com/gruntjs/grunt-contrib-concat
     * Imports all .js files and appends project banner
     */
    concat: {
      dev: {
        files: {
          '<%= project.assets %>/scripts/main.min.js': '<%= project.js %>'
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
          '<%= project.assets %>/js/main.min.js': '<%= project.js %>'
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
          '<%= project.assets %>/styles/main.min.css': '<%= project.css %>'
        }
      },
      dist: {
        options: {
          style: 'compressed',
          banner: '<%= tag.banner %>'
        },
        files: {
          '<%= project.assets %>/styles/main.min.css': '<%= project.css %>'
        }
      }
    },

    /**
     * Pug
     * https://github.com/gruntjs/grunt-contrib-pug
     * Grunt task for compiling pug templates
     */
    pug: {
      compile: {
        options: {
          data: {
            debug: true,
            pretty: true
          }
        },
        files: [{
          cwd: '<%= project.src %>/views',
          src: "*.pug",
          dest: '<%= project.app %>',
          expand: true,
          ext: '.html'
        }]
      }
    },

    /**
     * Spritesmith
     * https://github.com/Ensighten/grunt-spritesmith
     * Grunt task for converting a set of images into a spritesheet and corresponding CSS variables
     */
    sprite: {
      all: {
        src: '<%= project.src %>/images/sprite/{,*/}*.png',
        dest: '<%= project.assets %>/images/spritesheet.png',
        destCss: '<%= project.src %>/scss/mixins/_sprite.scss',
        algorithm: 'alt-diagonal',
        padding: 2
      }
    },

    /**
     * Bower
     * https://github.com/curist/grunt-bower
     * Grunt task for copying bower installed components to dist folder
     */
    bower: {
      dev: {
        dest: '<%= project.assets %>/',
        js_dest: '<%= project.assets %>/scripts',
        css_dest: '<%= project.assets %>/styles'
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
        files: '<%= project.src %>/scripts/{,*/}*.js',
        tasks: ['concat:dev']
      },
      sass: {
        files: '<%= project.src %>/scss/{,*/}*.{scss,sass}',
        tasks: ['sass:dev']
      },
      pug: {
        files: '<%= project.src %>/views/*.pug',
        tasks: ['pug']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '<%= project.app %>/{,*/}*.html',
          '<%= project.assets %>/styles/*.css',
          '<%= project.assets %>/scripts/{,*/}*.js',
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
    // 'bower:dev',
    'sass:dev',
    'concat:dev',
    'pug',
    'connect:livereload',
    'open',
    'watch'
  ]);

  /**
   * Build spritesheet
   * Run `grunt spritesheet` on the command line
   * Creates spritesheet
   */
  grunt.registerTask('spritesheet', [
    'sprite'
  ]);

  /**
   * Build task
   * Run `grunt build` on the command line
   * Then compress all JS/CSS files
   */
  grunt.registerTask('build', [
    'sass:dist',
    'uglify'
  ]);

};
