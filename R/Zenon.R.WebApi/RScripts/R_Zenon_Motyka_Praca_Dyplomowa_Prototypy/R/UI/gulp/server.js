(function() {
    'use strict';

    var gulp = require('gulp'),
        gulpPlugins = require('gulp-load-plugins')(),
        runSequence = require('run-sequence'),
        open = require('open');

    var buildControl = gulp.buildControl;

    //server and live reload config
    var serverConfig = {
        root: ['./build'],
        host: 'localhost',
        port: 9000,
        //https: true,
        livereload: true
    };

    /*============================================================
    =>                          Server
    ============================================================*/

    gulp.task('server', ['server:fireUpServer', 'server:openBrowserForServer'], function (callback) {
        callback();
    });

    gulp.task('server:dev', function (callback) {
        buildControl.isDevelopment = true;
        runSequence('clean', 'build', 'server', 'watch', callback);
    });

    gulp.task('server:uat', function (callback) {
        buildControl.isUat = true;
        runSequence('clean', 'build', 'server', 'watch', callback);
    });

    gulp.task('server:prod', function (callback) {
        buildControl.isProduction = true;
        runSequence('clean', 'build', 'server', 'watch', callback);
    });

    gulp.task('server:e2e', function (callback) {
        // hack: not needed for end to end tests and allows to exit the process after the tests are finished
        serverConfig.livereload = undefined;
        runSequence('server:fireUpServer', callback);
    });

    gulp.task('server:fireUpServer', function (callback) {
        console.log('------------------>>>> firing server  <<<<-----------------------');
        gulpPlugins.connect.server(serverConfig);
        callback();
    });

    gulp.task('server:openBrowserForServer', function (callback) {
        console.log('Started connect web server on http://localhost:' + serverConfig.port + '.');
        open('http://localhost:' + serverConfig.port);
        callback();
    });

    gulp.task('server:shutDownServer', function (callback) {
        console.log('------------------>>>> shutting the server down  <<<<-----------------------');
        gulpPlugins.connect.serverClose();
        callback();
    });
})();
