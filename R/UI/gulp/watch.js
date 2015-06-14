(function() {
    'use strict';

    var gulp = require('gulp'),
        runSequence = require('run-sequence');

    var paths = gulp.paths,
        log = gulp.log;

    /*=========================================================================================================
    =												Watch
    
        Incase the watch fails due to limited number of watches available on your sysmtem, the execute this
        command on terminal
    
        $ echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
    =========================================================================================================*/

    gulp.task('watch', function () {

        console.log('watching all the files.....');
        var watchedFiles = [];

        watchedFiles.push(gulp.watch([paths.src.css + '*.css', paths.src.css + '**/*.css'], ['styles:bundle']));
        watchedFiles.push(gulp.watch([paths.src.css + '*.less', paths.src.css + '**/*.less'], ['styles:bundle']));
        watchedFiles.push(gulp.watch([paths.src.js + '*.js', paths.src.js + '**/*.js'], ['scripts:bundle', 'copy:nonAngular']));
        watchedFiles.push(gulp.watch([paths.src.images + '*.*', paths.src.images + '**/*.*'], ['copy:images']));
        watchedFiles.push(gulp.watch([paths.src.bower + '*.js', paths.src.bower + '**/*.js'], ['scripts:bundle']));
        watchedFiles.push(gulp.watch([paths.src.app + '*.html', paths.src.app + '**/*.html'], ['copy:html']));

        // Just to add log messages on Terminal, in case any file is changed
        var onChange = function (event) {
            if (event.type === 'deleted') {
                runSequence('clean');
                setTimeout(function () {
                    runSequence('copy', 'concat', 'watch');
                }, 500);
            }
            console.log(log.change('-------------------------------------------------->>>> File ' + event.path + ' was ------->>>> ' + event.type));
        };
        watchedFiles.forEach(function (watchedFile) {
            watchedFile.on('change', onChange);
        });
    });
})();
