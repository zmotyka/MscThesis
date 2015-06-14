(function (angular) {
    'use strict';

    angular
        .module('app.core')
        .factory('common', common);

    function common($location, $q, $rootScope, $timeout, logger) {
        var service = {
            // common angular dependencies
            $q: $q,
            $timeout: $timeout,
            // generic
            logger: logger
        };

        return service;
    }
})(angular);
