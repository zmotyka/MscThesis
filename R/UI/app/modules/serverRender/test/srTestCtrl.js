(function (angular) {
    'use strict';

    angular
        .module('app.serverRender')
        .controller('srTestCtrl', srTestCtrl);

    function srTestCtrl(srTestService) {
        var vm = this;
        vm.svgImg = '';

        init();

        function init() {
            srTestService.getData().then(function (response) {
                vm.svgImg = response.data;
            });
        }
    }
})(angular);
