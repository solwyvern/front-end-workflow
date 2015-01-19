// # Grunt Tasks
module.exports = function(grunt) {
  // This file first matches the dependencies of all required **grunt-cli** from **package.json** file.
  "use strict";
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
  // ## Initialing Grunt Configuration
  // `grunt.initConfig()` Initializes all the tasks
  grunt.initConfig({
    // ### Defining tasks names with options.
    // Reading all the required task packages from *package.json*
    pkg: grunt.file.readJSON('package.json'),
    // #### Bower: Install required Dev Dependencies
    // **Bower** task installs resources defined in `bower.json` file inside **app** directory. It first creates a Bower's default components directory and start downloading the resources.

    // On Complete it copies downloaded resources to defined sub-directories inside **app** folder according to resource type.

    // When all the resources copied to it's destination Bower's default components directory will be removed. For more options browse [**Grunt-Bower-Task**](https://github.com/yatskevich/grunt-bower-task).
    bower: {
        install: {
          options: {
            targetDir: './app',
            layout: 'byType',
            install: true,
            verbose: false,
            cleanTargetDir: false,
            cleanBowerDir: true,
            bowerOptions: {
            }
          }
        }
      },
    // #### Css Condense task.
    // `cssc` task is used to compress css files. Get more details on options can be found on [**Grunt-Cssc**](https://github.com/mediapart/grunt-cssc)
    cssc: {
      build: {
        options: {
            sortSelectors: true,
            lineBreaks: true,
            sortDeclarations:true,
            consolidateViaDeclarations:true,
            consolidateViaSelectors:true,
            consolidateMediaQueries:true,
            sort:true,
            safe:true
        },
        files: {
            'app/css/themestent.css': 'app/css/themestent.css',
            'app/css/app.css': 'app/css/app.css',
        }
      }
    },
    // #### Compass
    // `compass` task following rules defined into **config.rb**. Look for more options [**Grunt-Contrib-compass**](https://github.com/gruntjs/grunt-contrib-compass)
    compass: {
      dev: {
        options: {
          config: 'config.rb',
          force: true
        }
      }
    },
    // #### CssLint
    // **csslint** task checks css syntax against a set of rules for better efficiency and make sure your css works as expected. **.csslintrc** file holds some of the options out of many which will be applied to the sources you will define. Get more detailed idea about [**grunt-contrib-csslint**](https://github.com/gruntjs/grunt-contrib-csslint)
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      src: ['app/css/themestent.css', 'app/css/app.css']
    },

    // #### Concatenate Multiple Files
    // `concat` task is concatenating multiple sources into a single file. Read more about it on [**grunt-contrib-concat**](https://github.com/gruntjs/grunt-contrib-concat)
    concat: {
      options: {
        banner: '<%= banner %><%= jqueryCheck %>',
        stripBanners: false
      },
      bootstrap: {
        src: [
          'app/js/bootstrap-sass/transition.js',
          'app/js/bootstrap-sass/alert.js',
          'app/js/bootstrap-sass/button.js',
          'app/js/bootstrap-sass/carousel.js',
          'app/js/bootstrap-sass/collapse.js',
          'app/js/bootstrap-sass/dropdown.js',
          'app/js/bootstrap-sass/modal.js',
          'app/js/bootstrap-sass/tooltip.js',
          'app/js/bootstrap-sass/popover.js',
          'app/js/bootstrap-sass/scrollspy.js',
          'app/js/bootstrap-sass/tab.js',
          'app/js/bootstrap-sass/affix.js'
        ],
        dest: 'app/js/bootstrap.js'
      },
      plugins: {
        src: [
          'app/js/plugins/echo/echo.min.js',
          'app/js/plugins/FitVids/jquery.fitvids.js',
          'app/js/plugins/FitText/jquery.fittext.js',
          'app/js/plugins/mixitup/jquery.mixitup.min.js'
        ],
        dest: 'app/js/plugins.js'
      },
    },
    // #### Clean Task
    // Before generating any new files, remove any previously-created files. Task name `clean`
    clean: {
      tests: {
        src:["app/dev/css/**/*.css","app/dev/js/**/*.js","app/dev/img/**/*.{png,jpg,gif}"]
      },
      css:{
        src:["app/dev/css/"]
      },
      js:{
        src:["app/dev/js/"]
      },
      img:{
        src:["app/dev/img/"]
      },
      fonts:{
        src:["app/dev/fonts/"]
      },
      svgs:{
        src:["app/dev/svgs/"]
      }
    },
    // #### Minify Images
    // `imagemin` task is using [**grunt-contrib-imagemin**](https://github.com/gruntjs/grunt-contrib-imagemin) to minify project images.
    imagemin: {
      dynamic: {                         // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'app/img/',                   // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'app/img/'                  // Destination path prefix
        }]
      }
    },
    // #### Minify Css
    // `cssmin` task is using [**grunt-contrib-cssmin**](https://github.com/gruntjs/grunt-contrib-cssmin) to minify css files.
    cssmin: {
      minify: {
          expand: true,
          cwd: 'app/css/',
          src: ['*.css', '!*.min.css'],
          dest: 'app/dev/css/',
          ext: '.css'
        }
    },
    // Copy Production CSS Files
    copy: {
      main: {
        files: [
        {
          expand:true,
          cwd:'app/',
          src:['**/*.js','**/*.css','**/*.{jpg,png,gif,jpeg}','**/*.svg','**/*.{eot,ttf,woff}'],
          dest:'app/dev/',
          extDot:'first'
        }
        ]
      },
      css: {
        files: [
          {
            expand:true,
            cwd:'app/css/',
            src:['**/*.css'],
            dest:'app/dev/css/',
            extDot:'first'
          }
        ]
      },
      js: {
        files: [
          {
            expand:true,
            cwd:'app/js/',
            src:['**/*.js'],
            dest:'app/dev/js/',
            extDot:'first'
          }
        ]
      },
      img: {
        files: [
          {
            expand:true,
            cwd:'app/img/',
            src:['**/*.{png,jpg,gif,jpeg}'],
            dest:'app/dev/img/',
            extDot:'first'
          }
        ]
      },
      fonts: {
        files: [
          {
            expand:true,
            cwd:'app/fonts/',
            src:['**/*.{eot,ttf,woff}'],
            dest:'app/dev/fonts/',
            extDot:'first'
          }
        ]
      },
      svgs: {
        files: [
          {
            expand:true,
            cwd:'app/svgs/',
            src:['**/*.svg'],
            dest:'app/dev/svgs/',
            extDot:'first'
          }
        ]
      }
    },
    // #### Groc for documentation
    // `groc` task is using [**grunt-groc**](https://github.com/jdcataldo/grunt-groc.git) to generate a usable documentation site right from your codes. It is a real time saver!
    groc: {
      default: ["README.md","bower.json.md","EditorConfig.md","Gruntfile.js","package.json.md","config.rb","CssLint.md","app/js/themestent.js","app/js/app.js","app/scss/themestent.scss","app/scss/app.scss","app/scss/_general-styles.scss","app/scss/_grid-components.scss","app/scss/_footer.scss","app/scss/_blog-components.scss"],
      options: {
        "out": "doc/",
        "index":"README.md",
        "index-page-title":"Front-End Workflow",
        "github": false,
        "repository-url": "https://github.com/themestent/front-end-workflow"
        }
    },
    // #### Jekyll - Site generator
    // `jekyll` task is using [**grunt-jekyll**](https://github.com/dannygarcia/grunt-jekyll) package to generate static site from Jekyll templates. Get some more information on [**Jekyll**](http://jekyllrb.com/).
    jekyll:{
      options:{
        src:'app/templates',
        dest:'app/dev',
        config:'app/_config.yml'
      },
      dev:{
        dest:'app/dev',
        include:['.htaccess'],
        keep_files:['app/dev/css/']
      }
    },
    // #### Grunt Watch File
    watch: {
      // **Watch Sass** file changes. On any file change it will run `compass` task.
      sass: {
        files: ['app/scss/**/*.scss'],
        tasks: ['compass:dev','clean:css','copy:css']
      },
      // **Watch .js** to see if our JavaScript files change, or new packages are installed and then `concat`
      js: {
        files: ['app/js/app.js', 'app/js/plugins.js','app/js/**/*.js'],
        tasks:['newer:concat:bootstrap','newer:concat:plugins','clean:js','copy:js']
      },
      // **Watch app/img/src** changes for responsive image converter
      img:{
      files:['app/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'],
      tasks:['newer:imagemin','clean:img','copy:img']
      },
      // **Watch Jekyll Templates** for changes and build `dev` files
      jekyll:{
        files:['app/templates/**/*.html'],
        tasks:['jekyll','copy:css','copy:img','copy:js','copy:fonts','copy:svgs']
      },
      // **Reload** the browser on any change
      livereload: {
        files: ['*.html','app/dev/*.html','app/js/*.js','app/dev/**/*.html','app/dev/css/**/*.css'],
        options: {
          livereload: true
        }
      }
    },
    // **Concurrent Output** to improve the build time.
    concurrent: {
      target: {
          tasks: ['newer:compass:dev','newer:cssc','jekyll:dev'],
          options: {
              logConcurrentOutput: true
          }
      }
    },
  });
  // ### Register Tasks
  // `grunt download` command to download all the required development resources
  grunt.registerTask('download',['bower:install']);
  // `grunt lint` command will run CssLint
  grunt.registerTask('lint',['csslint']);
  // `grunt minify` command will minify css files with css combine
  grunt.registerTask('minify',['cssmin']);
  // `grunt procss` command will create production ready css
  grunt.registerTask('procss',['clean','copy']);
  // `grunt proimg` minifies all the images inside img folder
  grunt.registerTask('proimg','Minification of images','newer:imagemin:dynamic');
  // `grunt doc` command will generate documentation site in **doc** directory.
  grunt.registerTask('doc','Generating documentation...',['groc']);
  // `grunt` command will start initial build and start watching the project for changes and react
  grunt.registerTask('default','Concatenating Bootstrap .js files, starting Compass compiler and watching the project for new changes...',['concurrent:target','copy','watch']);
}
