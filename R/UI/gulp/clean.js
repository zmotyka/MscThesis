(function() {
    'use strict';

    var gulp = require('gulp'),
        del = require('del'),
        vinylPaths = require('vinyl-paths');

    var paths = gulp.paths;

    /*============================================================
    =                          Clean                             =
    ============================================================*/

    var cleanFiles = function (files, logMessage) {
        console.log('-------------------------------------------------- CLEAN :' + logMessage);
        return gulp.src(files, { read: false })
            .pipe(vinylPaths(del));
    };

    gulp.task('clean', function () {
        return cleanFiles([paths.build.app], 'all files');
    });

    gulp.task('clean:css', function () {
        return cleanFiles([paths.build.css], 'css');
    });

    gulp.task('clean:js', function () {
        return cleanFiles([paths.build.js], 'js');
    });

    gulp.task('clean:html', function () {
        return cleanFiles([paths.build.templates], 'html');
    });

    gulp.task('clean:images', function () {
        return cleanFiles([paths.build.images], 'images');
    });

    gulp.task('clean:fonts', function () {
        return cleanFiles([paths.build.fonts + '*.*', paths.build.fonts + '**/*.*'], 'fonts');
    });

    gulp.task('clean:zip', function () {
        return cleanFiles(['zip/**/*', '!zip/build-*.zip'], 'zip');
    });
})();

