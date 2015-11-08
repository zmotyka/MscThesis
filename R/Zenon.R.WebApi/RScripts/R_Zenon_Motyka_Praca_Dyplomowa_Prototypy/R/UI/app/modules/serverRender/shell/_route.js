(function (angular) {
    'use strict';

    angular
        .module('app.serverRender')
        .run(routeConfig);

    function routeConfig(routeHelper) {
        routeHelper.configureRoutes(getRoutes());
    }

    function getRoutes() {

        return [{
            name: 'serverRender',
            url: '/serverRender',
            parent: 'main',
            abstract: true,
            templateUrl: 'modules/serverRender/shell/shell.html'
        }];
    }
})(angular);


