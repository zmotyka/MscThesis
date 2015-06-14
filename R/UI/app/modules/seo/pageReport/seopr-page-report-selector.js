(function (angular) {
    'use strict';

    angular
        .module('app.seo')
        .directive('seoprPageReportSelector', seoprPageReportSelector);

    function seoprPageReportSelector() {

        var directive = {
            restrict: 'A',
            scope: {
                currentId: '=',
                availableClassifications: '=',
                selectedClassification: '=',
            },
            templateUrl: 'modules/seo/pageReport/seopr-page-report-selector.html',
            controller: seoprPageReportSelectorCtrl,
            controllerAs: 'seoprPageReportSelectorVm',
            bindToController: true // to allow 'this' in controller with two-way binding http://blog.thoughtram.io/angularjs/2015/01/02/exploring-angular-1.3-bindToController.html
        };

        return directive;
    }

    /* @ngInject */
    function seoprPageReportSelectorCtrl() {
        var vm = this;

        vm.navigateTo = navigateTo;

        function navigateTo(itemId) {
            vm.currentId = itemId;
            vm.selectedClassification = _.find(vm.availableClassifications, { id: itemId });
        }
    }
})(angular);