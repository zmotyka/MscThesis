(function() {
    'use strict';

    var gulp = require('gulp'),
        gulpPlugins = require('gulp-load-plugins')();
    var paths = gulp.paths;

    /*============================================================
    =                          Minify				            =
    ============================================================*/

    gulp.task('image:min', function () {
        return gulp.src(paths.src.images + '**')
            .pipe(gulpPlugins.imagemin())
            .pipe(gulp.dest(paths.build.images))
            .pipe(gulpPlugins.connect.reload());
    });
})();
