(function() {
    'use strict';

    var gulp = require('gulp'),
        gulpPlugins = require('gulp-load-plugins')(),
        bowerFiles = require('main-bower-files');

    var paths = gulp.paths,
        bowerConfig = gulp.bowerConfig;

    /*============================================================
    =                           Fonts                            =
    ============================================================*/

    gulp.task('copy:fonts', ['copy:localFonts', 'copy:bowerFonts', 'copy:fontawesome']);

    gulp.task('copy:localFonts', function () {
        console.log('-------------------------------------------------- COPY :localFonts');
        return gulp.src(paths.src.fonts + '**/*.{eot,svg,ttf,woff,woff2}')
            .pipe(gulp.dest(paths.build.fonts));
    });

    gulp.task('copy:bowerFonts', function () {
        console.log('-------------------------------------------------- COPY :bowerFonts');
        return gulp.src(bowerFiles(bowerConfig))
            .pipe(gulpPlugins.filter('**/*.{eot,svg,ttf,woff,woff2}'))
            .pipe(gulpPlugins.flatten())
            .pipe(gulp.dest(paths.build.fonts));
    });

    gulp.task('copy:fontawesome', function () {
        console.log('-------------------------------------------------- COPY :fontawesome');
        return gulp.src(paths.src.bower + 'font-awesome/fonts/*.{eot,svg,ttf,woff,woff2}')
            .pipe(gulp.dest(paths.build.fonts));
    });
})();
