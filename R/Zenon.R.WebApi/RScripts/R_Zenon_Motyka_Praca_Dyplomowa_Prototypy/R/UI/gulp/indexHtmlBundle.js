(function() {
    'use strict';

    var gulp = require('gulp'),
        replace = require('gulp-replace');

    var paths = gulp.paths;

    /*============================================================
    =        index.html style/script section replace             =
    ============================================================*/

    gulp.task('indexHtml:bundle', function () {
        console.log('-------------------------------------------------- Replacing index.html scripts and styles');

        // update index.html references
        return gulp.src('app/index.html', { base: './' }) //must define base so I can overwrite the src file below. Per http://stackoverflow.com/questions/22418799/can-gulp-overwrite-all-src-files;
            // bower
            .pipe(replace(/<script id=\"jsBundle\".*><\/script>/g, '<script id="jsBundle" src="bundles/' + paths.cacheBuster.getJsBundleFileName() + '"></script>'))
            .pipe(replace(/<link rel=\"stylesheet\" id=\"cssBundle\".*\/>/g, '<link rel="stylesheet" id="cssBundle" href="bundles/' + paths.cacheBuster.getCssBundleFileName() + '"/>'))

            .pipe(gulp.dest('./')); //Write index.html back to the same spot.
    });
})();
