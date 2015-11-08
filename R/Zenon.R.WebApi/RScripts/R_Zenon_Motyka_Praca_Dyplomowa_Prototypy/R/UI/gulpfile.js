(function() {
    'use strict';

    var gulp = require('gulp'),
        chalk = require('chalk'),
        gulpPlugins = require('gulp-load-plugins')();
        //yargs = require('yargs'); // passing arguments from outside

    // parameters send through command execution, e.g. gulp server:uat --appVersion 2.29.0
    // TODO: ZM prepared for passing from appveyor as a build parameter
    //var args = yargs.argv;

    // Flags for build control
    var buildControl = {
        isDevelopment: false,
        isUat: false,
        isProduction: false,
        appVersion: '2.34.2'
        //appVersion: args.appVersion || 'dev'
    };

    buildControl.toBeMinified = function () {
        return buildControl.isProduction || buildControl.isUat;
    };

    var SETTINGS = {
        src: {
            app: 'app/',
            css: 'app/css/',
            js: 'app/',
            templates: 'app/templates/',
            sampleData: 'app/sampleData/',
            images: 'app/img/',
            nonAngular: 'app/nonAngular/', // scripts not related to angular, e.g. plain JS files
            fonts: 'app/fonts/',
            tests: 'tests/unit/**/*.js',
            e2e: 'tests/features/**/*.feature',
            bower: 'bower_components/'
        },
        build: {
            app: 'build/',
            images: 'build/img/',
            nonAngular: 'build/nonAngular/',
            sampleData: 'build/sampleData/',
            fonts: 'build/fonts/',
            bundles: 'build/bundles/'
        },
        cacheBuster: {
            getJsBundleFileName: function() {
                return '_jsBundle-' + buildControl.appVersion + '.js';
            },
            getCssBundleFileName: function() {
                return '_cssBundle-' + buildControl.appVersion + '.css';
            }
        },
        lessCompile: 'lessCompile/'
    };

    var bowerConfig = {
        paths: {
            bowerDirectory: SETTINGS.src.bower,
            bowerrc: '.bowerrc',
            bowerJson: 'bower.json'
        }
    };

    // chalk config
    var log = {
        error: chalk.red.bold,
        hint: chalk.blue,
        change: chalk.red
    };

    // registering global variables
    gulp.paths = SETTINGS;
    gulp.bowerConfig = bowerConfig;
    gulp.buildControl = buildControl;
    gulp.log = log;

    require('require-dir')('./gulp');

    // default task which runs when you call 'gulp'
    gulp.task('default', ['server:dev']);

    gulp.task('tasks', gulpPlugins.taskListing); // lists all available tasks
})();
