(function() {
    'use strict';

    var gulp = require('gulp'),
        karma = require('gulp-karma'),
        runSequence = require('run-sequence'),
        protractor = require("gulp-protractor").protractor;

    var paths = gulp.paths;

    /*============================================================
    =                    Testing using Mocha                     =
    ============================================================*/

    gulp.task('test', function () {
        // Be sure to return the stream
        return gulp.src(paths.src.tests)
            .pipe(karma({
                configFile: 'karma.conf.js',
                action: 'watch'
            }))
            .on('error', function (err) {
                // Make sure failed tests cause gulp to exit non-zero
                throw err;
            });
    });

    /*============================================================
    =                    Testing using Protractor                =
    ============================================================*/

    gulp.task('e2e', ['server:e2e'], function () {
        var params = process.argv;
        var args = params.length > 3 ? [params[3], params[4]] : [];

        // Be sure to return the stream
        return gulp.src(paths.src.e2e)
            .pipe(protractor({
                configFile: 'tests/protractor.conf.js',
                args: args
            }))
            .on('error', function(e) {
                 throw e;
            })
            .on('end', function () {
                runSequence('server:shutDownServer');
            });
    });
})();
