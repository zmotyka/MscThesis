(function (angular) {
    'use strict';

    angular
        .module('app.clientRender')
        .run(routeConfig);

    function routeConfig(routeHelper) {
        routeHelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [{
            name: 'clientRender.scatterChart',
            parent: 'clientRender',
            url: '/scatter-chart',
            templateUrl: 'modules/clientRender/scatterChart/crScatterChart.html',
            controller: 'crScatterChartCtrl',
            controllerAs: 'scatterChartVm'
        }];
    }
})(angular);


