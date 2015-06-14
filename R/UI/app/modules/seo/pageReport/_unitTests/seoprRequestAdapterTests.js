(function (chai, sinon, describe, beforeEach, it, inject) {
    'use strict';
    var expect = chai.expect;

    describe('Unit: seoprRequestAdapter', function () {

        beforeEach(module('app.seo'));

        var seoprRequestAdapter;
        var cmDateRangeType,
            cmGridSortDirection,
            cmSortDirection;

        beforeEach(inject(function (_seoprRequestAdapter_, _cmDateRangeType_, _cmGridSortDirection_, _cmSortDirection_) {

            seoprRequestAdapter = _seoprRequestAdapter_;
            cmDateRangeType = _cmDateRangeType_;
            cmGridSortDirection = _cmGridSortDirection_;
            cmSortDirection = _cmSortDirection_;
        }));

        // mapRequest
        // forms valid request payload
        // adds only one ordering if any exist
        describe('mapRequest', function () {
            describe('when called with requestData with skip and take', function() {
                var result = {};

                beforeEach(function () {
                    var requestData = {
                        skip: 10,
                        take: 110,
                        order: []
                    };

                    result = seoprRequestAdapter.mapRequest(requestData, cmDateRangeType.LAST_MONTH);
                });

                it('should map it to correct request', function () {
                    expect(result.start).to.equal(10);
                    expect(result.length).to.equal(110);
                    expect(result.dateRange.range).to.equal(cmDateRangeType.LAST_MONTH);
                });
            });

            describe('when called with requestData with sort columns', function () {
                var result = {};

                beforeEach(function() {
                    var requestData = {
                        skip: 0,
                        take: 10,
                        sort: [
                            {
                                field: 'deltaVolume',
                                dir: cmGridSortDirection.ASC
                            },
                            {
                                field: 'deltaRank',
                                dir: cmGridSortDirection.DESC
                            }
                        ]
                    };

                    result = seoprRequestAdapter.mapRequest(requestData, cmDateRangeType.LAST_MONTH);
                });

                it('should take only first sort', function() {
                    expect(result.sortOrder.column).to.equal('deltaVolume');
                    expect(result.sortOrder.sortDirection).to.equal(cmSortDirection.ASCENDING);
                });
            });
        });
    });
})(chai, sinon, describe, beforeEach, it, inject);
