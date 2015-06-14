(function (angular) {
    'use strict';

    angular
        .module('app.common')
        .directive('cmProgressBar', cmProgressBar);

    function cmProgressBar() {
        var directive = {
            restrict: 'A',
            scope: {
                show: '='
            },
            templateUrl: 'modules/common/directives/progress/cm-progress-bar.html',
            controllerAs: 'progressBarVm',
            controller: function () { },
            bindToController: true
        };

        return directive;
    }
})(angular);
