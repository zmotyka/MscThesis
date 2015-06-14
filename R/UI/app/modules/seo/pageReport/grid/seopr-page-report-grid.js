(function (angular) {
    'use strict';

    angular
        .module('app.seo')
        .directive('seoprPageReportGrid', seoprPageReportGrid);

    function seoprPageReportGrid($timeout, googleAnalytics, cmAnalyticsCategory) {

        var directive = {
            restrict: 'A',
            scope: {
                getRead: '&',
                dateRangeType: '=',
                currentGroup: '=',
                currentId: '=',
                isLoaded: '='
            },
            templateUrl: 'modules/seo/pageReport/grid/seopr-page-report-grid.html',
            controllerAs: 'pageReportGridVm',
            controller: seoprPageReportGridCtrl,
            link: function (scope, element, attrs) {
                scope.$watch('pageReportGridVm.gridDefinition', function (gridDefinition) {
                    $timeout(function () {
                        initialiseGridSettings(element, scope.pageReportGridVm.grid, gridDefinition);
                        initialiseColumnSortTracking(element);
                    });
                });
            },
            bindToController: true // to allow 'this' in controller with two-way binding http://blog.thoughtram.io/angularjs/2015/01/02/exploring-angular-1.3-bindToController.html
        };

        return directive;
        /////////////////

        function initialiseGridSettings(element, grid, gridDefinition) {
            element.find('.kendo-ui-grid-settings').kendoColumnMenu({
                filterable: false,
                sortable: false,
                dataSource: gridDefinition.dataSource,
                columns: gridDefinition.columns,
                owner: grid
            }).click(function () {
                angular.element(this).find('.k-header-column-menu').click();
                googleAnalytics.trackEvent(cmAnalyticsCategory.PAGE_REPORT, 'Grid Settings');
            });
        }

        function initialiseColumnSortTracking(element) {
            // track grid sorting
            element.find('.k-grid-header .k-link').click(function () {
                var header = angular.element(this).html();
                googleAnalytics.trackEvent(cmAnalyticsCategory.PAGE_REPORT, 'Column click: sort ' + header);
            });
        }
    }

    /* @ngInject */
    function seoprPageReportGridCtrl($scope, seoprGridDefinition, cmNumber, seoprDeltaClassProvider) {
        var vm = this;
        vm.grid = null;
        vm.gridDefinition = getGridDefinition();
        vm.getDeltaClass = getDeltaClass;
        vm.getRankDeltaClass = getRankDeltaClass;
        vm.navigateTo = navigateTo;
        vm.toolbar = angular.element('#seopr-page-report-grid-toolbar').html();

        function getGridDefinition() {
            return seoprGridDefinition.getGridDefinition(getReadFn);
        }

        function getReadFn(requestData) {
            return vm.getRead({ requestData: requestData });
        }

        function getDeltaClass(value) {
            return seoprDeltaClassProvider.getDeltaClass(value, _.isNumber(value));
        }

        function getRankDeltaClass(value) {
            var isAvailable = _.isNumber(value) && value !== cmNumber.NOT_RANKED;
            return seoprDeltaClassProvider.getDeltaClass(value, isAvailable);
        }

        function navigateTo(itemId) {
            vm.currentId = itemId;
        }

        // selected date range change, in directive seopr-page-report-date-range-toggle
        $scope.$watch(angular.bind(this, function () {
            return this.dateRangeType;
        }), function (newValue, oldValue) {
            if (oldValue !== newValue) {
                updateGrid();
            }
        });

        $scope.$watch(angular.bind(this, function () {
            return this.currentId;
        }), function (newValue, oldValue) {
            if (oldValue !== newValue) {
                vm.isLoaded = false; // isLoaded is set to false in seoprPageReportCtrl.getRead fn
                vm.gridDefinition.dataSource.read();
            }
        });

        function updateGrid() {
            vm.gridDefinition = getGridDefinition();
            vm.grid.setOptions(vm.gridDefinition);
        }
    }
})(angular);