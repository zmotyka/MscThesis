(function() {
    'use strict';

    var gulp = require('gulp'),
        gulpPlugins = require('gulp-load-plugins')(),
        streamqueue = require('streamqueue'),
        gutil = require('gulp-util'),
        bowerFiles = require('main-bower-files');

    var paths = gulp.paths,
        bowerConfig = gulp.bowerConfig,
        buildControl = gulp.buildControl;

    /*============================================================
    =                          Scripts                           =
    ============================================================*/

    gulp.task('scripts:bundle', ['scripts:concat']);

    gulp.task('scripts:concat', function () {
        console.log('-------------------------------------------------- SCRIPTS :concat');

        var jsFilter = gulpPlugins.filter('**/*.js');

        var jsFiles = gulp.src([
            paths.src.js + 'app.module.js',
            paths.src.js + '**/_module.js',
            paths.src.js + '**/*.js',
            // Not unit tests...
            '!' + paths.src.js + '**/_unitTests/*.js',
            '!' + paths.src.js + '**/_unitTests.js',
            // Not 3rdParty - handled in copy.js task
            '!' + paths.src.nonAngular + '**/*.js'
        ]);

        var bowerJsFiles = gulp.src(bowerFiles(bowerConfig), { base: paths.src.bower })
            .pipe(jsFilter);

        return streamqueue({ objectMode: true }, bowerJsFiles, jsFiles)
            .pipe(gulpPlugins.concat(paths.cacheBuster.getJsBundleFileName()))
            .pipe(gulpPlugins.ngAnnotate())
            .on('error', gutil.log)
            .pipe(gulpPlugins.if(buildControl.toBeMinified(), gulpPlugins.uglify()))
            .pipe(gulp.dest(paths.build.bundles))
            .pipe(gulpPlugins.connect.reload());
    });
})();
