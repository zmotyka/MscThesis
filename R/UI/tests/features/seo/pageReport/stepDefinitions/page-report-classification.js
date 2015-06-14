var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var mock = require('protractor-http-mock');

var loginPage = require('../../../pageObjects/loginPage.js');
var pageReportPage = require('./pageObjects/pageReportPage.js');

var steps = function () {
    var classification1 = '11111111-1111-1111-1111-111111111111'; // data reflected in pageReportData mock
    var classification2 = '6871ec86-70a1-4fb6-8566-1acc45b2207d'; // data reflected in pageReportData mock

    this.Given(/^the user is logged in$/, function (callback) {
        
        mock(['loginResponse', 'pageReportData',
            {
                request: {
                    path: '/pageReportClassification/get',
                    method: 'GET'
                },
                response: {
                    data: [
                        {
                            id: classification1,
                            name: 'Test structure 1', 
                            rootNodeName: 'Home Page' // data reflected in pageReportData mock
                        },
                        {
                            id: classification2,
                            name: 'Test structure 2',
                            rootNodeName: 'Kitchen Appliances' // data reflected in pageReportData mock
                        }
                    ],
                    status: 200
                },
            }
        ]);

        loginPage.defaultLogin().then(function() {
            callback();
        });
    });

    this.Given(/^the user has access to the Page Level report$/, function (callback) {
        pageReportPage.goToPage().then(function () {
            callback();
        });
    });

    this.Given(/^the selected Program has (\d+) Page Classifications defined$/, function (arg1, callback) {
        // defined in the previous given
        callback();
    });

    this.When(/^I change the classification$/, function (callback) {
        element(by.binding('seoprPageReportSelectorVm.selectedClassification.name'))
            .click();

        element.all(by.repeater('report in seoprPageReportSelectorVm.availableClassifications'))
            .get(1).click();

        callback();
    });

    this.Then(/^I should see the report for the top level group of that classification$/, function (callback) {
        expect(browser.getCurrentUrl()).to.eventually.have.string(classification2);
        expect(pageReportPage.getCurrentGroupTitle().getText()).to.eventually.have.string('Kitchen Appliances'); // data reflected in pageReportData mock

        callback();
    });

    this.AfterScenario(function (scenario, callback) {
        mock.teardown();
        callback();
    });
};

module.exports = steps;

