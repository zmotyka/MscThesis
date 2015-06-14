// i. Download chromedriver - http://chromedriver.storage.googleapis.com/index.html
// ii. Move chromedriver.exe to ./node_modules/protractor/selenium/
// iii. Install protractor as a global npm module - npm install -g protractor
//      If node-gyp fails try to run it like this: npm install --msvs_version=2012 protractor
// $ protractor tests/e2e/sampleTest.js
'use strict';
exports.config = {
    baseUrl: 'http://localhost:9000/',
    seleniumServerJar: '../node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-2.45.0.jar',
    chromeDriver: '../node_modules/chromedriver/lib/chromedriver/chromedriver.exe',
    suites: {
        seo: [
            'features/seo/pageReport/page-report-actual-data-formatting.feature',
            'features/seo/pageReport/page-report-classification.feature',
            'features/seo/pageReport/page-report-drill-down.feature',
            'features/seo/pageReport/page-report-drill-up.feature',
            'features/seo/pageReport/page-report-weekly-monthly-toggle.feature'
        ]
    },
    maxSessions: 3,
    //multiCapabilities: [
        // todo: not working yet with different browsers
        //{
        //    browserName: 'internet explorer',
        //    platform: 'ANY',
        //    version: '10'
        //},
        //{
        //    browserName: 'firefox',
        //     //IMPORTANT: for debugging comment shardTestFiles - makes it easier :)
        //    shardTestFiles: true,
        //    maxInstances: 10
        //},
        //{
        //    browserName: 'chrome',
        //    // IMPORTANT: for debugging comment shardTestFiles - makes it easier :)
        //    shardTestFiles: true,
        //    maxInstances: 10
        //}
    //],
    capabilities: {
        browserName: 'chrome',
        // IMPORTANT: for debugging comment shardTestFiles - makes it easier :)
        shardTestFiles: true,
        maxInstances: 10
    },
    framework: 'cucumber',
    mocks: {
        dir: 'mocks'
    },
    jasmineNodeOpts: {
        showColors: true // Use colors in the command line report.
    },
    cucumberOpts: {
        format: 'pretty'
    },
    onPrepare: function() {
        // implicit and page load timeouts
        browser.manage().timeouts().pageLoadTimeout(40000);
        browser.manage().timeouts().implicitlyWait(1000);
    }
};

require("protractor-http-mock").config = {
    rootDirectory: __dirname,
    protractorConfig: "protractor.conf.js"
};