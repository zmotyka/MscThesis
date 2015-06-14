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

    this.Given(/^there is data for page level report$/, function (callback) {
        // data mocked in Before step
        callback();
    });

    this.Given(/^the initial page report is displayed$/, function (callback) {
        pageReportPage.goToPage().then(function () {
            callback();
        });
    });

    this.When(/^I click on the name of grid entry$/, function (callback) {
        pageReportPage.getNameAnchorOfFirstGridRow().click().then(function () {
            callback();
        });
    });

    this.Then(/^it should drill down$/, function (callback) {
        var currentGroupTitle = pageReportPage.getCurrentGroupTitle();

        expect(currentGroupTitle.getText()).to.eventually.equal('Kitchen Appliances');
        expect(browser.getCurrentUrl()).to.eventually.have.string('6871ec86-70a1-4fb6-8566-1acc45b2207d');

        callback();
    });

    this.Then(/^show the data for that entry$/, function (callback) {
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

    this.Then(/^I can drill up to the parent node$/, function (callback) {

        var currentGroupTitle = pageReportPage.getCurrentGroupTitle();

        expect(currentGroupTitle.getAttribute('class')).not.to.eventually.have.string('disabled');

        currentGroupTitle.click().then(function () {
            var currentGroupAnchor = pageReportPage.getCurrentGroupTitleAnchor();
            var currentGroupAnchorClass = currentGroupAnchor.getAttribute('class');
            var currentGroupText = currentGroupAnchor.getText();

            expect(currentGroupAnchorClass).to.eventually.have.string('disabled');
            expect(currentGroupText).to.eventually.have.string('Home Page');

            callback();
        });
    });

    this.AfterScenario(function (scenario, callback) {
        mock.teardown();
        callback();
    });
};

module.exports = steps;