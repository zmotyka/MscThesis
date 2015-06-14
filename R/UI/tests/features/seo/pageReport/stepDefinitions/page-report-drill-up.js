var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var mock = require('protractor-http-mock');

var loginPage = require('../../../pageObjects/loginPage.js');
var pageReportPage = require('./pageObjects/pageReportPage.js');

var steps = function () {

    this.Given(/^The Page Report is currently displaying data$/, function (callback) {
        mock(['loginResponse', 'pageReportClassificationData', 'pageReportData']);

        loginPage.defaultLogin().then(function () {
            return pageReportPage.goToPage();
        }).then(function () {
            callback();
        });
    });

    this.Given(/^the selected group has a parent group$/, function (callback) {
        // drill down one level to have parent
        pageReportPage.getNameAnchorOfFirstGridRow().click().then(function () {
            callback();
        });
    });

    this.When(/^I click on the name of the parent group above the grid$/, function (callback) {
        var currentGroupTitle = pageReportPage.getCurrentGroupTitle();
        currentGroupTitle.click().then(function() {
            callback();
        });
    });

    this.Then(/^it should drill up to that parent group$/, function (callback) {
        var currentGroupTitle = pageReportPage.getCurrentGroupTitle();

        expect(currentGroupTitle.getText()).to.eventually.equal('Home Page');
        expect(browser.getCurrentUrl()).to.eventually.have.string('11111111-1111-1111-1111-111111111111');

        callback();
    });

    this.Then(/^shows the Summary data for that group$/, function (callback) {
        // Summary
        var deltaCells = pageReportPage.getDeltaCellsOfSummaryItemRow();
        // pageCount
        expect(pageReportPage.getDeltaCellText(deltaCells, 0)).to.eventually.equal('+32.43%');
        expect(pageReportPage.getActualCellText(deltaCells, 0)).to.eventually.equal('42,104');
        // keywordCount
        expect(pageReportPage.getDeltaCellText(deltaCells, 1)).to.eventually.equal('+43.25%');
        expect(pageReportPage.getActualCellText(deltaCells, 1)).to.eventually.equal('65,843');

        callback();
    });

    this.Then(/^shows the aggregated values on the Grid for the child groups$/, function (callback) {
        // Grid
        var firstRowDeltaCells = pageReportPage.getDeltaCellsOfFirstGridRow();
        // pageCount
        expect(pageReportPage.getDeltaCellText(firstRowDeltaCells, 0)).to.eventually.equal('0.00%');
        expect(pageReportPage.getActualCellText(firstRowDeltaCells, 0)).to.eventually.equal('0');
        // keywordCount
        expect(pageReportPage.getDeltaCellText(firstRowDeltaCells, 1)).to.eventually.equal('0.00%');
        expect(pageReportPage.getActualCellText(firstRowDeltaCells, 1)).to.eventually.equal('0');

        callback();
    });

    this.AfterScenario(function (scenario, callback) {
        mock.teardown();
        callback();
    });
};

module.exports = steps;

