//(function() {
//    'use strict';

//    var gulp = require('gulp'),
//        gulpPlugins = require('gulp-load-plugins')(),
//        remoteSrc = require('gulp-remote-src'),
//        prettify = require('gulp-jsbeautifier');

//    var paths = gulp.paths;

//    /*============================================================
//    =                           API proxy                        =
//    ============================================================*/

//    // task for generating API proxy file
//    gulp.task('apiProxy', function () {
//        console.log('-------------------------------------------------- Generating API proxy file');
//        return remoteSrc([''], {
//            base: paths.src.apiProxyBase,
//            strictSSL: false
//        })
//        .pipe(gulpPlugins.concat('_proxies.js'))
//        .pipe(prettify())
//        .pipe(gulp.dest(paths.src.apiProxyTarget));
//    });
//})();
