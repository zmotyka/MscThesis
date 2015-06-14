(function() {
    'use strict';

    var gulp = require('gulp'),
        runSequence = require('run-sequence');

    var buildControl = gulp.buildControl,
        log = gulp.log;

    gulp.task('artifact:dev', function () {
        console.log(log.hint('-------------------------------------------------- Artifact Dev'));
        console.log(log.hint('-------------------------------------------------- Application Version: ' + buildControl.appVersion));
        buildControl.isDevelopment = true;
        prepareArtifact();
    });

    gulp.task('artifact:uat', function () {
        console.log(log.hint('-------------------------------------------------- Artifact Uat'));
        console.log(log.hint('-------------------------------------------------- Application Version: ' + buildControl.appVersion));
        buildControl.isUat = true;
        prepareArtifact();
    });

    gulp.task('artifact:prod', function () {
        console.log(log.hint('-------------------------------------------------- Artifact Prod'));
        console.log(log.hint('-------------------------------------------------- Application Version: ' + buildControl.appVersion));
        buildControl.isProduction = true;
        prepareArtifact();
    });

    function prepareArtifact() {
        runSequence('configuration', 'bundle', 'copy');
    }
})();
