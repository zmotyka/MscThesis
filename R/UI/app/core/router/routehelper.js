(function (angular) {
    'use strict';

    angular
        .module('app.core.router')
        .factory('routeHelper', routeHelper);

    function routeHelper($route, routeHelperConfig) {

        var routeCounts = {
            errors: 0,
            changes: 0
        };
        var routes = [];
        var $urlRouterProvider = routeHelperConfig.config.$urlRouterProvider;
        var $stateProvider = routeHelperConfig.config.$stateProvider;

        var service = {
            configureRoutes: configureRoutes,
            getRoutes: getRoutes,
            routeCounts: routeCounts
        };

        return service;
        ///////////////

        function configureRoutes(newRoutes) {
            newRoutes.forEach(function (route) {
                $stateProvider.state(route);
            });
            $urlRouterProvider.otherwise('/');
        }

        function getRoutes() {
            for (var prop in $route.routes) {
                if ($route.routes.hasOwnProperty(prop)) {
                    var route = $route.routes[prop];
                    var isRoute = !!route.title;
                    if (isRoute) {
                        routes.push(route);
                    }
                }
            }
            return routes;
        }
    }
})(angular);
