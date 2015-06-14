(function() {
    'use strict';

    var gulp = require('gulp'),
        gulpPlugins = require('gulp-load-plugins')(),
        bowerFiles = require('main-bower-files'),
        streamqueue = require('streamqueue'),
        path = require('path'),
        map = require('map-stream'),
        gutil = require('gulp-util');

    var paths = gulp.paths,
        bowerConfig = gulp.bowerConfig,
        buildControl = gulp.buildControl;

    /*============================================================
    =                          Styles                            =
    ============================================================*/

    gulp.task('styles:bundle', ['styles:concat', 'styles:bootstrapMapFile']);

    gulp.task('styles:concat', ['styles:less'], function () {

        console.log('-------------------------------------------------- Styles :concat ');

        var devLessCompiledCss = gulp.src(paths.lessCompile + 'index.css'); // result of stylesBundle:less
        var bowerCss = gulp.src(bowerFiles(bowerConfig), { base: paths.src.bower })
            .pipe(gulpPlugins.filter('**/*.css')) // get only css files
            .pipe(map(function (file, callback) { // fix CSS resource url('...') paths
                var relativePath = path.dirname(path.relative(path.resolve(paths.src.bower), file.path));

                // CSS path resolving
                // Taken from https://github.com/enyojs/enyo/blob/master/tools/minifier/minify.js
                var contents = file.contents.toString().replace(/url\([^)]*\)/g, function (match) {
                    // find the url path, ignore quotes in url string
                    var matches = /url\s*\(\s*(('([^']*)')|("([^"]*)")|([^'"]*))\s*\)/.exec(match),
                        url = matches[3] || matches[5] || matches[6];

                    // Don't modify data and http(s) urls
                    if (/^data:/.test(url) || /^http(:?s)?:/.test(url)) {
                        return 'url(' + url + ')';
                    }
                    return 'url(' + path.join(path.relative(paths.build.bundles, paths.build.app), paths.build.bundles, relativePath, url) + ')';
                });
                file.contents = new Buffer(contents);

                callback(null, file);
            }));

        return streamqueue({ objectMode: true }, bowerCss, devLessCompiledCss)
            .pipe(gulpPlugins.concat(paths.cacheBuster.getCssBundleFileName()))
            .pipe(gulpPlugins.if(buildControl.toBeMinified(), gulpPlugins.minifyCss({ keepSpecialComments: 0 })))
            .on('error', gutil.log)
            .pipe(gulp.dest(paths.build.bundles))
            .pipe(gulpPlugins.connect.reload());
    });

    gulp.task('styles:less', function () {
        console.log('-------------------------------------------------- Styles :less ');

        return gulp.src(paths.src.css + 'index.less')
            .pipe(gulpPlugins.less()) // compile less files
            .on('error', gutil.log)
            .pipe(gulpPlugins.autoprefixer())
            .pipe(gulp.dest(paths.lessCompile)); // put it to the temporary location, ready for concat:css
    });

    // fix for 404 bootstrap.css.map issue
    gulp.task('styles:bootstrapMapFile', function () {
        console.log('-------------------------------------------------- Styles :bootstrapMapFile ');

        return gulp.src(paths.src.bower + 'bootstrap/dist/css/bootstrap.css.map')
            .pipe(gulp.dest(paths.build.bundles)); 
    });
})();
