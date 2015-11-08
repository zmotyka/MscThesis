(function() {
    'use strict';

    var gulp = require('gulp'),
        gulpPlugins = require('gulp-load-plugins')(),
        stylish = require('jshint-stylish'),
        fs = require('fs');

    var paths = gulp.paths,
        hintOptions = JSON.parse(fs.readFileSync('.jshintrc', 'utf8')); // jsHint Options.

    /*============================================================
    =                          JS-HINT                          =
    ============================================================*/

    gulp.task('js:hint', function () {

        console.log('-------------------------------------------------- JS - HINT');
        var src = [
            paths.src.js + 'app.js',
            paths.src.js + '**/*.js',
            'gulpfile.js',
            'gulp/*.js',
            '!' + paths.src.nonAngular + 'thirdParty/**/*.js'
        ];
        var stream = gulp.src(src)
            .pipe(gulpPlugins.jshint(hintOptions))
            .pipe(gulpPlugins.jshint.reporter(stylish));
        return stream;
    });
})();
