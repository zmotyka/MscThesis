(function() {
    'use strict';

    var gulp = require('gulp'),
        gulpPlugins = require('gulp-load-plugins')();

    var paths = gulp.paths,
        buildControl = gulp.buildControl;

    /*============================================================
    =                           Copy                            =
    ============================================================*/

    gulp.task('copy', ['copy:html', 'copy:images', 'copy:favIco', 'copy:fonts', 'copy:sampleData', 'copy:nonAngular', 'copy:webConfig']);

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

    gulp.task('copy:favIco', function () {

        console.log('-------------------------------------------------- COPY :fav.ico');
        return gulp.src([paths.src.app + 'fav.ico'])
            .pipe(gulp.dest(paths.build.app));
    });

    gulp.task('copy:sampleData', function () {

        console.log('-------------------------------------------------- COPY :sampleData');
        return gulp.src([paths.src.sampleData + '*.*', paths.src.sampleData + '**/*.*'])
            .pipe(gulp.dest(paths.build.sampleData));
    });

    gulp.task('copy:nonAngular', function () {

        console.log('-------------------------------------------------- COPY :nonAngular');
        return gulp.src([paths.src.nonAngular + '*.*', paths.src.nonAngular + '**/*.*'], { base: paths.src.nonAngular })
            // todo: Fix uglifying for nonAngular or find other solution for that
            //.pipe(gulpPlugins.if(buildControl.toBeMinified(), gulpPlugins.uglify()))
            .pipe(gulp.dest(paths.build.nonAngular));
    });

    // used for the deployment only
    gulp.task('copy:webConfig', function () {

        console.log('-------------------------------------------------- COPY :webConfig');
        return gulp.src([paths.src.app + 'web.config'])
            .pipe(gulp.dest(paths.build.app));
    });
})();

