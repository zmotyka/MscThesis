(function (angular) {
    'use strict';

    angular
        .module('app.serverRender')
        .controller('srTestCtrl', srTestCtrl);

    function srTestCtrl(srTestService) {
        var vm = this;
        vm.svgImages = [];

        init();

        function init() {
            srTestService.getData().then(function (response) {
                vm.svgImages = response.data;
            });
        }
    }
})(angular);
