(function (angular) {
    'use strict';

    var core = angular.module('app.core');

    // A module is a collection of configuration and run blocks which get applied to the application
    // during the bootstrap process. In its simplest form the module consist of a collection
    // of two kinds of blocks:
    //
    // Configuration blocks - get executed during the provider registrations and configuration phase.
    //      Only providers and constants can be injected into configuration blocks.
    //      This is to prevent accidental instantiation of services before they have been fully configured.
    // Run blocks - get executed after the injector is created and are used to kickstart
    //      the application. Only instances and constants can be injected into run blocks.
    //      This is to prevent further system configuration during application run time.

    core.config(configure);
    core.run(run);

    function configure($httpProvider, $logProvider, $stateProvider, $urlRouterProvider, routeHelperConfigProvider) {

        // You can only inject Providers (not instances)
        // into config blocks.

        configureLogging();
        configureHttpProvider();
        configureRouting();

        function configureLogging() {
            // turn debugging off/on (no info or warn)
            if ($logProvider.debugEnabled) {
                $logProvider.debugEnabled(true);
            }
        }

        function configureHttpProvider() {
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        }

        function configureRouting() {
            var routeCfg = routeHelperConfigProvider;
            routeCfg.config.$stateProvider = $stateProvider;
            routeCfg.config.$urlRouterProvider = $urlRouterProvider;
        }
    }

    function run($rootScope, $state) {

        // You can only inject instances (not Providers)
        // into run blocks

        configureRootScope();

        function configureRootScope() {
            // used in main navigation to determine currently selected item
            $rootScope.$state = $state;
        }
    }
})(angular);
