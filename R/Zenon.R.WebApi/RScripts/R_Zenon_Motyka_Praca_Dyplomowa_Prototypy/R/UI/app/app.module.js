(function (angular) {
    'use strict';

    angular.module('app', [
        /*
         * Order is not important. Angular makes a
         * pass to register all of the modules listed
         * and then when app.featureXXX tries to use app.data,
         * it's components are available.
         */

        /*
         * Everybody has access to these.
         * We could place these under every feature area,
         * but this is easier to maintain.
         */
        'app.core',
        'app.common',
        /*
         * Features
         * Add new features here
         */
        
        'app.serverRender',
        'app.clientRender'
    ]);
})(angular);