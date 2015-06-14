(function (angular) {
    'use strict';

    angular
        .module('app.seo')
        .run(routeConfig);

    function routeConfig(routeHelper) {
        routeHelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [{
            name: 'seo.pageReport',
            parent: 'seo',
            url: '/page-report/:classificationName/:currentId/:dateRangeType',
            templateUrl: 'modules/seo/pageReport/seoprPageReport.html',
            controller: 'seoprPageReportCtrl',
            controllerAs: 'pageReportVm',
            resolve: {
                classifications: /* @ngInject */ function (seoprPageReportService) {
                    return seoprPageReportService.getClassifications();
                }
            }
        }];
    }
})(angular);


