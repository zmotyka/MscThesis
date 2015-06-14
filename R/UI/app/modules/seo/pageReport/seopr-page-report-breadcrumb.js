(function (angular) {
    'use strict';

    angular
        .module('app.seo')
        .directive('seoprPageReportBreadcrumb', seoprPageReportBreadcrumb);

    function seoprPageReportBreadcrumb() {

        var directive = {
            restrict: 'A',
            scope: {
                currentId: '=',
                currentGroup: '=',
                classification: '=',
                isLoaded: '='
            },
            templateUrl: 'modules/seo/pageReport/seopr-page-report-breadcrumb.html',
            controller: seoprPageReportBreadcrumbCtrl,
            controllerAs: 'pageReportBreadcrumbVm',
            bindToController: true // to allow 'this' in controller with two-way binding http://blog.thoughtram.io/angularjs/2015/01/02/exploring-angular-1.3-bindToController.html
        };

        return directive;
    }

    /* @ngInject */
    function seoprPageReportBreadcrumbCtrl() {
        var vm = this;

        // vm.currentId - set in isolated scope
        // vm.currentGroup - set in isolated scope
        // vm.rootGroup - set in isolated scope
        vm.navigateTo = navigateTo;
        vm.isRootCurrentlyDisplayed = isRootCurrentlyDisplayed;
        vm.navigateToRoot = navigateToRoot;
        
        function navigateTo(itemId) {
            vm.currentId = itemId;
        }

        function navigateToRoot() {
            vm.currentId = vm.classification.id;
        }

        function isRootCurrentlyDisplayed() {
            return vm.classification &&
                vm.currentGroup &&
                vm.classification.id === vm.currentGroup.id;
        }
    }
})(angular);