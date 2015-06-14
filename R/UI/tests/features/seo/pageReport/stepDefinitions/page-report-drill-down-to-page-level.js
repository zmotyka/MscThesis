var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var mock = require('protractor-http-mock');

var loginPage = require('../../../pageObjects/loginPage.js');
var pageReportPage = require('./pageObjects/pageReportPage.js');

var steps = function () {

    this.Given(/^The Page Report shows the data for the lowest level Group$/, function (callback) {
        mock(['loginResponse', 'pageReportClassificationData', 'pageReportData']);

        loginPage.defaultLogin().then(function () {
            return pageReportPage.goToPage();
        }).then(function () {
            callback();
        });
    });

    this.When(/^I click on the name of a group in the grid$/, function (callback) {
        pageReportPage.getNameAnchorOfFirstGridRow().click().then(function () {
            callback();
        });
    });

    this.Then(/^it should show the list of all pages in the selected Group$/, function (callback) {
        var nameCellText = pageReportPage.getNameOfFirstGridRow();
        expect(nameCellText).to.eventually.equal('Kitchen Appliances Page');

        callback();
    });

    this.Then(/^I should be able to navigate to any of those pages$/, function (callback) {
        var targetUrl = 'http://www.currys.co.uk/gbuk/household-appliances-35-u.html';
        var nameAnchor = pageReportPage.getNameAnchorOfFirstGridRow();

        expect(nameAnchor.getAttribute('href')).to.eventually.equal(targetUrl);

        var newWindowCurrentUrlPromise = nameAnchor.click().then(function () {
            return browser.getAllWindowHandles();
        }).then(function (handles) {
            return browser.switchTo().window(handles[1]);
        }).then(function () {
            return browser.driver.getCurrentUrl();
        });

        expect(newWindowCurrentUrlPromise).to.eventually.equal(targetUrl);

        browser.getAllWindowHandles().then(function (handles) {
            browser.driver.close().then(function () {
                //to switch to the previous window
                browser.switchTo().window(handles[0]);
                callback();

            });
        });
    });

    this.AfterScenario(function (scenario, callback) {
        mock.teardown();
        callback();
    });
};

module.exports = steps;