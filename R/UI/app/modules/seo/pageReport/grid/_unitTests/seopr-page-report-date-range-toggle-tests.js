(function (chai, sinon, describe, beforeEach, it, inject) {
    'use strict';
    var expect = chai.expect;

    describe('Unit: seoprPageReportDateRangeToggle', function () {

        beforeEach(module('app.seo'));
        beforeEach(module('templates'));
        var scope,
            element,
            controller,
            compile,
            cmDateRangeType;

        beforeEach(inject(function ($rootScope, $compile, _cmDateRangeType_) {
            compile = $compile;
            scope = $rootScope.$new();
            cmDateRangeType = _cmDateRangeType_;
        }));

        function compileDirective(tmpl) {
            element = compile(tmpl)(scope);
            
            // $digest is necessary to finalize the directive generation
            scope.$digest();
            controller = element.controller("seoprPageReportDateRangeToggle");
        }

        describe('setDateRangeToWeekly', function () {

            it('should set to weekly if previously was set to monthly', function () {
                compileDirective('<div seopr-page-report-date-range-toggle="" selected-date-range-type="selectedDateRangeType"></div>');

                controller.selectedDateRangeType = cmDateRangeType.LAST_MONTH;

                var weeklyButton = element.find('.weekly-range-button');
                weeklyButton.triggerHandler('click');

                expect(controller.selectedDateRangeType).to.equal(cmDateRangeType.LAST_WEEK);
                expect(weeklyButton.hasClass('btn-primary')).to.be.true;
            });
        });

        describe('setDateRangeToMonthly', function () {

            it('should set to monthly if previously was set to weekly', function () {
                compileDirective('<div seopr-page-report-date-range-toggle="" selected-date-range-type="selectedDateRangeType"></div>');

                controller.selectedDateRangeType = cmDateRangeType.LAST_WEEK;

                var monthlyButton = element.find('.monthly-range-button');
                monthlyButton.triggerHandler('click');

                expect(controller.selectedDateRangeType).to.equal(cmDateRangeType.LAST_MONTH);
                expect(monthlyButton.hasClass('btn-primary')).to.be.true;
            });

        });
    });
})(chai, sinon, describe, beforeEach, it, inject);
