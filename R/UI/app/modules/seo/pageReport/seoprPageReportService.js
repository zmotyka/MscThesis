(function (angular) {
    'use strict';

    angular
        .module('app.seo')
        .factory('seoprPageReportService', seoprPageReportService);

    function seoprPageReportService($q, apiProxy, seoprRequestAdapter) {

        return {
            getData: getData,
            getClassifications: getClassifications
        };

        function getData(requestData, dateTypeRange, parentId) {
            var reportRequest = seoprRequestAdapter.mapRequest(requestData, dateTypeRange);
            var result = apiProxy.pageHierarchy.getReport(reportRequest, parentId).then(function (response) {
                return response.data;
            });
            return result;
        }

        function getClassifications() {
            var result = apiProxy.pageReportClassification.get().then(function (response) {
                return response.data;
            });
            return result;
        }
    }
})(angular);
