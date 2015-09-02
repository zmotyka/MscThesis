(function (angular) {
    'use strict';

    angular
        .module('app.clientRender')
        .controller('crTestCtrl', crTestCtrl);

    function crTestCtrl(crTestService) {
        var vm = this;

        vm.labels = [];
        vm.data = [];

        init();

        function init() {
            crTestService.getData().then(function (response) {
                vm.labels = _.pluck(response.data, 'x');
                vm.data = [_.pluck(response.data, 'count')];
            });
        }
    }
})(angular);
