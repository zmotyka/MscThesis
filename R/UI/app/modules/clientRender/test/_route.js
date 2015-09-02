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
            name: 'clientRender.test',
            parent: 'clientRender',
            url: '/test',
            templateUrl: 'modules/clientRender/test/crTest.html',
            controller: 'crTestCtrl',
            controllerAs: 'testVm'
        }];
    }
})(angular);


