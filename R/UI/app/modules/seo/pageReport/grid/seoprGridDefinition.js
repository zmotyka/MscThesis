(function (angular) {
    'use strict';

    angular
        .module('app.seo')
        .factory('seoprGridDefinition', seoprGridDefinition);

    function seoprGridDefinition(seoprGridFactory, seoprGridHelper) {

        return {
            getGridDefinition: getGridDefinition
        };

        function getGridDefinition(getReadFn) {
            var grid = {
                sortable: true,
                scrollable: {
                    virtual: true
                },
                reorderable: true,
                allowCopy: true,
                //mobile: seoprGridHelper.isGridInMobileMode(), // it would be great to get that option working but it messes up the layout
                height: seoprGridHelper.getGridHeight(),
                // todo: uncomment when excel needed
                //excel: {
                //    allPages: true,
                //},
            };

            var gridProperties = seoprGridFactory.create(getReadFn);
            grid.dataSource = gridProperties.dataSource;
            grid.columns = gridProperties.columns;

            return grid;
        }
    }
})(angular);
