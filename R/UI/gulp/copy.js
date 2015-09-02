(function() {
    'use strict';

    var gulp = require('gulp'),
        gulpPlugins = require('gulp-load-plugins')();

    var paths = gulp.paths,
        buildControl = gulp.buildControl;

    /*============================================================
    =                           Copy                            =
    ============================================================*/

    gulp.task('copy', ['copy:html', 'copy:images', 'copy:fonts', 'copy:webConfig']);

    gulp.task('copy:html', function () {

        console.log('-------------------------------------------------- COPY :html');

        return gulp.src([paths.src.app + '*.html', paths.src.app + '**/*.html'])
            .pipe(gulpPlugins.if(buildControl.toBeMinified(), gulpPlugins.htmlmin({
                removeComments: true,
                removeCommentsFromCDATA: true,
                collapseWhitespace: true,
                minifyJS: true,
                minifyCSS: true,
                removeEmptyAttributes: false
            })))
            .pipe(gulp.dest(paths.build.app))
            .pipe(gulpPlugins.connect.reload());
    });

    gulp.task('copy:images', function () {

        console.log('-------------------------------------------------- COPY :images');
        return gulp.src([paths.src.images + '*.*', paths.src.images + '**/*.*'], { base: paths.src.images })
            .pipe(gulp.dest(paths.build.images));
    });

    // used for the deployment only
    gulp.task('copy:webConfig', function () {

        console.log('-------------------------------------------------- COPY :webConfig');
        return gulp.src([paths.src.app + 'web.config'])
            .pipe(gulp.dest(paths.build.app));
    });
})();

