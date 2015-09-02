(function (angular) {
    'use strict';

    angular
        .module('app.serverRender')
        .factory('srTestService', srTestService);

    function srTestService($http) {

        return {
            getData: getData
        };

        function getData() {
            var request = {
                url: 'http://localhost:51777/api/serverRender/get',
                method: 'GET'
            };
            return $http(request);
        }
    }
})(angular);
