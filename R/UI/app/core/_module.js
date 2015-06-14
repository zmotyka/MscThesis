(function (angular) {
    'use strict';

    angular.module('app.core', [
        /*
         * Angular modules
         */
        'ngRoute',
        'ngAnimate',
        'toastr',
        /*
         * Our reusable cross app code modules
         */
        'app.core.cache', 
        'app.core.configuration', // auto-generated environment specific (dev, uat, prod) config file, based on configuration.json 
        'app.core.exception',
        'app.core.logger',
        'app.core.router',

        /*
         * 3rd Party modules
         */
        'ui.bootstrap',         // ui-bootstrap (ex: carousel, pagination, dialog) - angular-ui

        'ui.router',
        'angularAccounting', // number formatting
    ]);
})(angular);