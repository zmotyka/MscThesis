(function (angular) {
    'use strict';

    angular
        .module('app.clientRender')
        .controller('crScatterChartCtrl', crScatterChartCtrl);

    function crScatterChartCtrl(crScatterChartService) {
        var vm = this;

        //vm.data = [{
        //    "key": "Group 0",
        //    "values": [
        //      { "x": 0.1905653578931545, "y": 0.8115218253543552, "size": 0.2 },
        //      { "x": -0.47275546081985614, "y": -0.21250610156481783, "size": 0.2 }
        //}];
        vm.xAxisTickFormat = xAxisTickFormat;
        init();

        function init() {
            crScatterChartService.getScatterChartData().then(function (response) {
                vm.data = [{
                    key: 'Group 0',
                    values: response.data
                }];
                console.log(vm.data);
            });
        }

        function xAxisTickFormat(value) {
            console.log(value);
            return value.toFixed(2);
        }
    }
})(angular);
