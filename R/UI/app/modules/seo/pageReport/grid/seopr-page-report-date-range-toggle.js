(function (angular) {
    'use strict';

    angular
        .module('app.seo')
        .directive('seoprPageReportDateRangeToggle', seoprPageReportDateRangeToggle);

    function seoprPageReportDateRangeToggle() {

        var directive = {
            restrict: 'A',
            scope: {
                selectedDateRangeType: '='
            },
            templateUrl: 'modules/seo/pageReport/grid/seopr-page-report-date-range-toggle.html',
            controller: seoprPageReportDateRangeToggleCtrl,
            controllerAs: 'pageReportDateRangeToggleVm',
            bindToController: true // to allow 'this' in controller with two-way binding http://blog.thoughtram.io/angularjs/2015/01/02/exploring-angular-1.3-bindToController.html
        };

        return directive;
    }

    /* @ngInject */
    function seoprPageReportDateRangeToggleCtrl(cmDateRangeType, googleAnalytics, cmAnalyticsCategory) {
        var vm = this;

        // vm.selectedDateRangeType - set in isolated scope
        vm.setDateRangeToWeekly = setDateRangeToWeekly;
        vm.setDateRangeToMonthly = setDateRangeToMonthly;
        vm.isWeeklySelected = isWeeklySelected;
        vm.isMonthlySelected = isMonthlySelected;

        function setDateRangeToWeekly() {
            setDateRangeType(cmDateRangeType.LAST_WEEK);
            googleAnalytics.trackEvent(cmAnalyticsCategory.PAGE_REPORT, 'seoprPageReportDateRangeToggleCtrl.setDateRangeToWeekly');
        }

        function setDateRangeToMonthly() {
            setDateRangeType(cmDateRangeType.LAST_MONTH);
            googleAnalytics.trackEvent(cmAnalyticsCategory.PAGE_REPORT, 'seoprPageReportDateRangeToggleCtrl.setDateRangeToMonthly');
        }

        function isWeeklySelected() {
            return vm.selectedDateRangeType === cmDateRangeType.LAST_WEEK;
        }

        function isMonthlySelected() {
            return vm.selectedDateRangeType === cmDateRangeType.LAST_MONTH;
        }

        function setDateRangeType(dateRangeType) {
            vm.selectedDateRangeType = dateRangeType;
        }
    }
})(angular);