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
            name: 'home',
            controller: 'homeCtrl',
            templateUrl: 'modules/common/home/home.html',
            url: '/',
            parent: 'main'
        }];
    }
})(angular);


