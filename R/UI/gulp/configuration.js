//(function() {
//    'use strict';

//    var gulp = require('gulp'),
//        gulpPlugins = require('gulp-load-plugins')(),
//        ngConstant = require('gulp-ng-constant'),
//        prettify = require('gulp-jsbeautifier');

//    var paths = gulp.paths,
//        buildControl = gulp.buildControl;

//    // generate _configuration.js file with constants based on app/configuration.json file
//    gulp.task('configuration', function () {
//        console.log('-------------------------------------------------- Generating environment specific Configuration file');

//        var myConfig = require('../' + paths.src.app + 'configuration.json');
//        var env = getEnvironment(buildControl);
//        var envConfig = myConfig[env];

//        // additional constant config values
//        envConfig.configuration.appVersion = buildControl.appVersion;

//        var result =
//            ngConstant({
//                name: 'app.core.configuration',
//                constants: envConfig,
//                stream: true,
//                wrap: true
//            })
//	        .pipe(gulpPlugins.concat('_configuration.js'))
//	        .pipe(prettify())
//            .pipe(gulp.dest(paths.src.configTarget));

//        return result;
//    });

//    function getEnvironment() {
//        var envConfig = 'dev';

//        if (buildControl.isUat) {
//            envConfig = 'uat';
//        } else if (buildControl.isProduction) {
//            envConfig = 'prod';
//        }

//        return envConfig;
//    }
//})();
