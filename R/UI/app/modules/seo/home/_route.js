(function (angular) {
    'use strict';

    angular
        .module('app.seo')
        .run(routeConfig);

    function routeConfig(routeHelper) {
        routeHelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [{
            name: 'seo.home',
            parent: 'seo',
            url: '/home',
            templateUrl: 'modules/seo/home/home.html'
        }];
    }
})(angular);


