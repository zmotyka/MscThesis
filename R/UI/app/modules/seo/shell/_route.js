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
            name: 'seo',
            url: '/seo',
            parent: 'main',
            abstract: true,
            templateUrl: 'modules/seo/shell/shell.html'
        }];
    }
})(angular);


