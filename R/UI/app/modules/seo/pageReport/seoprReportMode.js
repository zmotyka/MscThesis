(function (angular) {
    'use strict';

    angular
        .module('app.seo')
        .constant('seoprReportMode', {
            DELTA: 'Delta',
            ACTUAL: 'Actual'
        });
})(angular);
