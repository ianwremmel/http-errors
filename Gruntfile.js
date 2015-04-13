'use strict';

var path = require('path');
var uuid = require('uuid');

module.exports = function(grunt) {
  /* eslint max-statements: [0] */

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    bump: {
      options: {
        files: [
          'package.json',
          '<%= config.src %>/version.js'
        ],
        commitFiles: [
          'package.json',
          '<%= config.src %>/version.js'
        ],
        tagName: '%VERSION%',
        updateConfigs: ['pkg'],
        pushTo: 'origin'
      }
    },

    clean: {
      reports: {
        src: ['reports']
      }
    },

    config: {
      reports: 'reports',
      src: 'src',
      test: 'test',
      tmp: '.tmp'
    },

    copy: {
      test: {
        files: [{
          expand: true,
          cwd: '.',
          src: 'test/**',
          dest: '<%= config.tmp %>'
        }]
      }
    },

    env: {
      test: {
        GRUNT_OPTION_COVERAGE: grunt.option('coverage'),
        GRUNT_OPTION_XUNIT: grunt.option('xunit')
      }
    },

    eslint: {
      all: [
        '<%= config.src %>/**/*.js',
        '<%= config.test %>/**/*.js',
        'Gruntfile.js'
      ]
    },

    instrument: {
      files: '<%= config.src %>/**/*.js',
      options: {
        basePath: '<%= config.tmp %>'
      }
    },

    makeReport: {
      src: 'reports/coverage/*/coverage*.json',
      options: {
        type: [
          'cobertura',
          'lcov'
        ],
        dir: 'reports/coverage/all',
        print: 'summary'
      }
    },

    mochaTest: {
      options: {
        reporter: 'spec'
      },
      unit: {
        options: {
          reporterOptions: {
            output: 'reports/xunit-unit.xml'
          }
        },
        src: ['<%= config.test %>/unit/spec/**/*.js']
      }
    },

    pkg: grunt.file.readJSON('package.json'),

    storeCoverage: {
      options: {
        dir: 'reports/coverage/mocha'
      }
    },

    watch: {
      unit: {
        options: {
          atBegin: true
        },
        files: [
          'src/**/*.js',
          'test/unit/**/*'
        ],
        tasks: [
          'test:unit'
        ]
      }
    }
  });

  var mochaTest;
  if (grunt.option('coverage')) {
    mochaTest = grunt.config('mochaTest');
    mochaTest.unit.src[0] = grunt.config('config').tmp + '/' + mochaTest.unit.src[0];
    grunt.config('mochaTest', mochaTest);
  }

  if (grunt.option('xunit')) {
    var eslint = grunt.config('eslint');
    eslint.options = eslint.options || {};
    eslint.options.format = 'junit';
    eslint.options.outputFile = 'reports/eslint.xml';
    grunt.config('eslint', eslint);

    var jscs = grunt.config('jscs');
    jscs.options.reporter = 'junit';
    jscs.options.reporterOutput = 'reports/jscs.xml';
    grunt.config('jscs', jscs);

    mochaTest = grunt.config('mochaTest');
    mochaTest.options.reporter = 'xunit';
    grunt.config('mochaTest', mochaTest);
  }

  // Public Tasks
  // ------------

  grunt.registerTask('test', function(target) {
    if (target && grunt.option('xunit')) {
      throw new Error('For reasons that are not entirely clear, --xunit=true hangs when a target is specified. Please run all tests or remove the xunit switch.');
    }

    /* eslint complexity:[0] */
    var tasks = [
      'env:test',
      'clean'
    ];

    if (!target) {
      tasks.push('eslint');
    }

    if (grunt.option('coverage')) {
      tasks.push('copy:test');
      tasks.push('instrument');
    }

    tasks.push('mochaTest:unit');

    if (grunt.option('coverage')) {
      tasks.push('storeCoverage');
    }

    if (grunt.option('coverage')) {
      tasks.push('makeReport');
    }

    if (grunt.option('xunit')) {
      tasks.unshift('continue:on');
      tasks.push('continue:off');
    }

    grunt.task.run(tasks);
  });

  grunt.registerTask('default', ['test']);
};
