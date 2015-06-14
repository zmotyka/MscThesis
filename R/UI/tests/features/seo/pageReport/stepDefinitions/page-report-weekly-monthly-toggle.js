var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var mock = require('protractor-http-mock');

var loginPage = require('../../../pageObjects/loginPage.js');
var pageReportPage = require('./pageObjects/pageReportPage.js');

var steps = function () {

    this.Given(/^the User has access to OneSearch\.Spa$/, function (callback) {
        mock(['loginResponse', 'pageReportClassificationData', 'pageReportData']);

        loginPage.defaultLogin().then(function () {
            callback();
        });
    });

    this.Given(/^the page report view is shown with Weekly option selected by default$/, function (callback) {
        pageReportPage.goToPage().then(function() {
            return pageReportPage.clickWeeklyButton();
        }).then(function() {
            callback();
        });
    });

    this.Given(/^there is data for page level report$/, function (callback) {
        expect(pageReportPage.getSummaryItemByModel()).not.to.be.null;
        callback();
    });

    this.When(/^I change the mode to Monthly$/, function (callback) {
        pageReportPage.clickMonthlyButton().then(function() {
            callback();
        });
    });

    this.Then(/^the values of Summary and Grid components should be updated accordingly$/, function (callback) {

        // Summary
        var deltaCells = pageReportPage.getDeltaCellsOfSummaryItemRow();

        // pageCount
        expect(pageReportPage.getDeltaCellText(deltaCells, 0)).to.eventually.equal('+13.24%');
        expect(pageReportPage.getActualCellText(deltaCells, 0)).to.eventually.equal('142,104');
        // keywordCount
        expect(pageReportPage.getDeltaCellText(deltaCells, 1)).to.eventually.equal('+14.33%');
        expect(pageReportPage.getActualCellText(deltaCells, 1)).to.eventually.equal('165,843');

        // Grid
        var firstRowDeltaCells = pageReportPage.getDeltaCellsOfFirstGridRow();
        // pageCount
        expect(pageReportPage.getDeltaCellText(firstRowDeltaCells, 0)).to.eventually.equal('+10.00%');
        expect(pageReportPage.getActualCellText(firstRowDeltaCells, 0)).to.eventually.equal('10');
        // keywordCount
        expect(pageReportPage.getDeltaCellText(firstRowDeltaCells, 1)).to.eventually.equal('+10.00%');
        expect(pageReportPage.getActualCellText(firstRowDeltaCells, 1)).to.eventually.equal('10');

        callback();
    });

    this.Then(/^Url will be updated containing LastMonth$/, function (callback) {
        expect(browser.getCurrentUrl()).to.eventually.have.string('LastMonth').notify(callback);
    });

    this.Then(/^I can change the mode back to Weekly$/, function (callback) {
        expect(pageReportPage.isWeeklyButtonEnabled()).to.eventually.be.true;

        pageReportPage.clickWeeklyButton();
        expect(pageReportPage.getWeeklyButton().getAttribute('class')).to.eventually.have.string('btn-primary');

        callback();
    });

    this.AfterScenario(function (scenario, callback) {
        mock.teardown();
        callback();
    });
};

module.exports = steps;

