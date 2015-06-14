var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var mock = require('protractor-http-mock');

var loginPage = require('../../../pageObjects/loginPage.js');
var pageReportPage = require('./pageObjects/pageReportPage.js');

var steps = function () {

    this.Given(/^The Page Report is currently displaying Actual data$/, function (callback) {
        mock(['loginResponse', 'pageReportClassificationData',
            {
                request: {
                    path: 'pageHierarchy/getReport',
                    method: 'POST',
                    queryString: {
                        parentId: '11111111-1111-1111-1111-111111111111'
                    },
                    data: {
                        start: 0,
                        length: 100,
                        dateRange: {
                            range: 'LastWeek'
                        }
                    }
                },
                response: {
                    data: {
                        summaryItem: {
                            id: '11111111-1111-1111-1111-111111111111',
                            parentId: null,
                            name: 'Home Page',
                            url: null,
                            pageCount: 4210414,
                            keywordCount: 6584300,
                            volume: 6565190.0,
                            rank: 9.6,
                            reach: 743286.9,
                            reachPercentage: 0.2537,
                            traffic: 762432,
                            orders: 7532,
                            revenue: 8954.42543,
                            cvr: 0.32442,
                            deltaPageCount: 0.32432,
                            deltaKeywordCount: 0.43254,
                            deltaVolume: -0.34324,
                            deltaRank: 0.32543,
                            deltaReach: 0.3443543,
                            deltaReachPercentage: 0.3243534,
                            deltaTraffic: 0.76245,
                            deltaOrders: -0.845,
                            deltaRevenue: -0.23352,
                            deltaCvr: 0.43433
                        },
                        totalItems: 1,
                        items: [
                            {
                                id: '6871ec86-70a1-4fb6-8566-1acc45b2207d',
                                parentId: '11111111-1111-1111-1111-111111111111',
                                name: 'Kitchen Appliances',
                                url: null,
                                pageCount: null,
                                keywordCount: 1111111,
                                volume: 2222222.22222,
                                rank: 32767,
                                reach: 444444.444,
                                reachPercentage: 0.555,
                                traffic: 4444444,
                                orders: 3333333,
                                revenue: 111111.111,
                                cvr: 0.9999,
                                deltaPageCount: 0.99,
                                deltaKeywordCount: 0.111,
                                deltaVolume: 0.77,
                                deltaRank: 0.11,
                                deltaReach: 0.2222,
                                deltaReachPercentage: 0.777,
                                deltaTraffic: 0.444,
                                deltaOrders: 0.333,
                                deltaRevenue: 0.888,
                                deltaCvr: 0.4444
                            }
                        ]
                    }
                }
            }
        ]);

        loginPage.defaultLogin().then(function () {
            return pageReportPage.goToPage();
        }).then(function () {
            callback();
        });
    });

    this.When(/^I look at the data in the Page Report$/, function (callback) {
        // nothing to implement, navigation done in the previous step
        callback();
    });

    this.Then(/^Number of Pages will be displayed as an integer with format \#,\#\#\#,\#\#\#$/, function (callback) {
        testPropertyByIndex(0, '4,210,414', '-');
        callback();
    });

    this.Then(/^Number of Keywords will be displayed as an integer with format \#,\#\#\#,\#\#\#$/, function (callback) {
        testPropertyByIndex(1, '6,584,300', '1,111,111');
        callback();
    });

    this.Then(/^Volume will be displayed as an decimal with format \#,\#\#\#,\#\#\#\.\#$/, function (callback) {
        testPropertyByIndex(2, '6,565,190.0', '2,222,222.2');
        callback();
    });

    this.Then(/^Reach will be displayed as an decimal with format \#,\#\#\#,\#\#\#\.\#$/, function (callback) {
        testPropertyByIndex(3, '743,286.9', '444,444.4');
        callback();
    });

    this.Then(/^Reach% will be displayed as an decimal with format \#\#\#\.\#\#%$/, function (callback) {
        testPropertyByIndex(4, '25.37%', '55.50%');
        callback();
    });

    this.Then(/^Rank will be displayed as an decimal with format \#\#\.\# or N\/R$/, function (callback) {
        testPropertyByIndex(5, '9.6', 'N/R');
        callback();
    });

    this.Then(/^Traffic will be displayed as an integer with format \#,\#\#\#,\#\#\#$/, function (callback) {
        testPropertyByIndex(6, '762,432', '4,444,444');
        callback();
    });

    this.Then(/^Orders will be displayed as an integer with format \#,\#\#\#,\#\#\#$/, function (callback) {
        testPropertyByIndex(7, '7,532', '3,333,333');
        callback();
    });

    this.Then(/^Revenue will be displayed as a currency with format £\#,\#\#\#,\#\#\#\.\#\#$/, function (callback) {
        testPropertyByIndex(8, '£8,954.43', '£111,111.11');
        callback();
    });

    this.Then(/^CVR will be displayed as an decimal with format \#\#\#\.\#\#%$/, function (callback) {
        testPropertyByIndex(9, '32.44%', '99.99%');
        callback();
    });

    this.Then(/^if a value is not available a - will be used to indicate this$/, function (callback) {
        // test against pageCount
        testPropertyByIndex(0, '4,210,414', '-');
        callback();
    });

    this.AfterScenario(function(scenario, callback) {
        mock.teardown();
        callback();
    });

    var testPropertyByIndex = function(index, summaryCellValue, firstRowCellValue) {
        var summaryDeltaCells = pageReportPage.getDeltaCellsOfSummaryItemRow();
        var firstRowDeltaCells = pageReportPage.getDeltaCellsOfFirstGridRow();

        expect(pageReportPage.getActualCellText(summaryDeltaCells, index)).to.eventually.equal(summaryCellValue);
        expect(pageReportPage.getActualCellText(firstRowDeltaCells, index)).to.eventually.equal(firstRowCellValue);
    }
};

module.exports = steps;

