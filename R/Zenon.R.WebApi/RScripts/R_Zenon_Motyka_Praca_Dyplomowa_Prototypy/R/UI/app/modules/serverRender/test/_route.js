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
            name: 'serverRender.test',
            parent: 'serverRender',
            url: '/test',
            templateUrl: 'modules/serverRender/test/srTest.html',
            controller: 'srTestCtrl',
            controllerAs: 'testVm'
        }];
    }
})(angular);


