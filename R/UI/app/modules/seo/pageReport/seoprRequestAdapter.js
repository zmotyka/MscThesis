(function (angular) {
    'use strict';

    angular
        .module('app.seo')
        .factory('seoprRequestAdapter', seoprRequestAdapter);

    function seoprRequestAdapter(cmGridSortDirection, cmSortDirection) {

        return {
            mapRequest: mapRequest
        };

        function mapRequest(requestData, dateTypeRange) {
            var reportRequest = {
                start: requestData.skip,
                length: requestData.take,
                dateRange: {
                    range: dateTypeRange
                }
            };
            // hack: currently api supports only single column sort
            var sortParam = requestData.sort;
            if (sortParam && sortParam[0]) {
                var sort = sortParam[0];
                reportRequest.sortOrder = {
                    column: sort.field,
                    sortDirection: sort.dir === cmGridSortDirection.ASC
                        ? cmSortDirection.ASCENDING
                        : cmSortDirection.DESCENDING
                };
            }

            return reportRequest;
        }
    }
})(angular);
