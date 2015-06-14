(function (angular) {
    'use strict';

    angular
        .module('app.seo')
        .controller('seoprPageReportCtrl', seoprPageReportCtrl);

    function seoprPageReportCtrl($scope, $state, $stateParams, seoprGridDefinition, seoprPageReportService, logger, cmDateRangeType, classifications) {
        var vm = this;

        vm.currentId = $stateParams.currentId;
        vm.selectedDateRangeType = $stateParams.dateRangeType || cmDateRangeType.LAST_WEEK; // last week by default
        vm.isLoaded = false;
        vm.navigateTo = navigateTo;
        vm.getRead = getRead;
        vm.availableClassifications = classifications;
        vm.selectedClassification = null;
        vm.currentGroup = null;

        init();

        function init() {

            // if there are no classifications defined for program
            if (!thereAreClassificationsAvailable()) {
                // todo: change to not found
                $state.go('unauthorized');
                return;
            }

            // set default classification if not provided in the URL parameter
            vm.selectedClassification = getClassificationToBeSelected($stateParams.classificationName);
            // if in any case there is no classification then go to not found page
            if (!vm.selectedClassification) {
                // todo: change to not found
                $state.go('unauthorized');
                return;
            }
            
            // if the current grouop is not provided in the URL then select the master group
            if (!vm.currentId) {
                vm.currentId = vm.selectedClassification.id;
            }
        }

        function thereAreClassificationsAvailable() {
            return vm.availableClassifications && vm.availableClassifications.length > 0;
        }

        function getClassificationToBeSelected(classificationNameParam) {
            var result = null;
            if (!classificationNameParam) {
                result = getDefaultClassification();
            } else {
                // get the selected classification from URL
                result = getClassification(classificationNameParam);
            }
            return result;
        }

        function getClassification(classificationName) {
            var result = null;
            var classification = _.filter(vm.availableClassifications, function (c) {
                return _.kebabCase(c.name) === classificationName;
            });

            if (classification) {
                result = classification[0];
            }

            return result;
        }

        function getDefaultClassification() {
            return vm.availableClassifications[0];
        }

        function navigateTo(itemId) {
            vm.currentId = itemId;
        }
        
        // selected date range change, in directive seopr-page-report-date-range-toggle
        $scope.$watch(angular.bind(this, function () {
            return this.selectedDateRangeType;
        }), function () {
            setStateWithoutPageReload();
        });

        $scope.$watch(angular.bind(this, function () {
            return this.currentId;
        }), function () {
            setStateWithoutPageReload();
        });

        $scope.$watch(angular.bind(this, function () {
            return this.selectedClassification;
        }), function () {
            setStateWithoutPageReload();
        });

        // private
        function setStateWithoutPageReload() {
            $state.transitionTo('seo.pageReport', {
                classificationName: _.kebabCase(vm.selectedClassification.name),
                currentId: vm.currentId,
                dateRangeType: vm.selectedDateRangeType
            }, {
                inherit: true,
                notify: false
            });
        }

        function getRead(requestData) {
            // not setting vm.isLoaded = false because for date range change we don't change the selected group
            return seoprPageReportService.getData(requestData, vm.selectedDateRangeType, vm.currentId)
                .then(function (data) {
                    vm.currentGroup = data.summaryItem;
                    vm.isLoaded = true;

                    return data;
                })
                .catch(function (error) {
                    logger.error('Problem with fetching the report data', error);
                });
        }
    }
})(angular);
