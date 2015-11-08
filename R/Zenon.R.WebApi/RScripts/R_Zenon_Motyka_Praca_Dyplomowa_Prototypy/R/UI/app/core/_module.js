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
        'app.core.exception',
        'app.core.logger',
        'app.core.router',

        /*
         * 3rd Party modules
         */
        'ui.bootstrap',         // ui-bootstrap (ex: carousel, pagination, dialog) - angular-ui

        'ui.router'
    ]);
})(angular);