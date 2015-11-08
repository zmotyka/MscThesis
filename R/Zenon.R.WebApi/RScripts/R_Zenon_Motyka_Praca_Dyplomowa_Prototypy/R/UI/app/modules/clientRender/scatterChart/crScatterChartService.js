(function (angular) {
    'use strict';

    angular
        .module('app.clientRender')
        .factory('crScatterChartService', crScatterChartService);

    function crScatterChartService($http) {

        return {
            getData: getData,
            getScatterChartData: getScatterChartData
        };

        function getData() {
            var request = {
                url: 'http://localhost:51777/api/clientRender/getScatterChart',
                method: 'GET'
            };
            return $http(request);
        }

        function getScatterChartData() {
            var request = {
                url: 'http://localhost:51777/api/clientRender/getScatterChart',
                method: 'GET'
            };
            return $http(request);
        }
    }
})(angular);
