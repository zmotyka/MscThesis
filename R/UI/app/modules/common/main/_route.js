(function (angular) {
    'use strict';

    angular
        .module('app.common')
        .run(routeConfig);

    function routeConfig(routeHelper) {
        routeHelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [{
            name: 'main',
            abstract: true,
            templateUrl: 'modules/common/main/shell.html'
        }];
    }
})(angular);