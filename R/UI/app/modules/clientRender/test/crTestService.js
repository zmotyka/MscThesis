(function (angular) {
    'use strict';

    angular
        .module('app.clientRender')
        .factory('crTestService', crTestService);

    function crTestService($http) {

        return {
            getData: getData
        };

        function getData() {
            var request = {
                url: 'http://localhost:51777/api/clientRender/getHistogram',
                method: 'GET'
            };
            return $http(request);
        }
    }
})(angular);
