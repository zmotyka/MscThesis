(function() {
    'use strict';

    var gulp = require('gulp'),
        runSequence = require('run-sequence');

    var log = gulp.log;

    gulp.task('build', function (callback) {
        console.log(log.hint('-------------------------------------------------- BUILD - Development Mode'));
        runSequence('bundle', 'copy', 'js:hint', callback);
    });
})();
