(function() {
    'use strict';

    var gulp = require('gulp');

    /*============================================================
    =                          Bundle                            =
    ============================================================*/

    gulp.task('bundle', ['styles:bundle', 'scripts:bundle', 'indexHtml:bundle']);
})();
