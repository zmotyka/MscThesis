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
            name: 'clientRender',
            url: '/clientRender',
            parent: 'main',
            abstract: true,
            templateUrl: 'modules/clientRender/shell/shell.html'
        }];
    }
})(angular);


