(function (angular) {
    'use strict';

    angular
        .module('app.seo')
        .factory('seoprGridFactory', seoprGridFactory);

    function seoprGridFactory(seoprGridDataSource) {
        return {
            create: create
        };

        function create(getReadFn) {
            var grid = {
                dataSource: seoprGridDataSource.getDataSource(getReadFn),
                columns: seoprGridDataSource.getColumnsDefinition()
            };

            return grid;
        }
    }
})(angular);
