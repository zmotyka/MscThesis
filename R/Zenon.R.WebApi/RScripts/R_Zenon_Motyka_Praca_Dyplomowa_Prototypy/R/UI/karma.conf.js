// Karma configuration
// Generated on Sun Nov 02 2014 22:02:16 GMT+0000 (GMT Standard Time)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'sinon', 'sinon-chai', 'chai', 'chai-as-promised'],


        // list of files / patterns to load in the browser
        files: [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angulartics/src/angulartics.js',
            'bower_components/angulartics/src/angulartics-ga.js',
            'http://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.12.0/ui-bootstrap.min.js',

            //'bower_components/signalr/jquery.signalR.js',
            //'bower_components/angular-signalr-hub/signalr-hub.js',

            'bower_components/toastr/toastr.js',
            'bower_components/angular-toastr/dist/angular-toastr.js',
            'bower_components/moment/moment.js',

            'bower_components/lodash/lodash.js',
            'bower_components/angular-local-storage/dist/angular-local-storage.js',
            'bower_components/angular-http-auth/src/http-auth-interceptor.js',
            'bower_components/angular-base64/angular-base64.js',
            'bower_components/angular-gettext/dist/angular-gettext.js',

            'bower_components/accounting/accounting.js',
            'bower_components/angular-accounting/angular-accounting.js',

            'app/app.module.js',
            'app/**/*.module.js',
            'app/**/*.js',
            'app/**/*.html'
        ],


        // list of files to exclude
        exclude: [
            'app/nonAngular/thirdParty/flot/**/*.js',
            // exclucde cache buster as it messes up the unit tests for directives
            'app/core/cache/htmlCacheBusterHttpInterceptor.js'
            //'app/data/tests.unit/*.js'
            // Todo: The account unit test has started getting the template - not sure why -Error:
            // Unexpected request: GET app/features/account/account.html
           // 'app/features/account/**/*.js'
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            '**/*.html': ['ng-html2js']
        },

        ngHtml2JsPreprocessor: {
            // strip this from the file path
            stripPrefix: 'app/',
            // setting this option will create only a single module that contains templates
            // from all the files, so you can load them all with module('foo')
            moduleName: 'templates'
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};
