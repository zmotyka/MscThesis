(function() {
    'use strict';

    var gulp = require('gulp'),
        gulpPlugins = require('gulp-load-plugins')(),
        runSequence = require('run-sequence');

    var paths = gulp.paths;

    /*============================================================
    =                             Zip                          =
    ============================================================*/

    gulp.task('zip', function () {
        gulp.src([paths.build.app + '*', paths.build.app + '**/*'])
            .pipe(gulpPlugins.zip('build-' + new Date() + '.zip'))
            .pipe(gulp.dest('./zip/'));

        setTimeout(function () {
            runSequence('clean:zip');
        }, 500); // wait for file creation
    });
})();
