(function (angular) {
    'use strict';

    angular
        .module('app.core.router')
        .provider('routeHelperConfig', routeHelperConfig);

    // Must configure via the routehelperConfigProvider
    function routeHelperConfig() {
        /* jshint validthis:true */
        this.config = {
            // These are the properties we need to set
            // $stateProvider: undefined
            // $urlRouterProvider: undefined
            // docTitle: ''
            // resolveAlways: {ready: function(){ } }
        };

        this.$get = function() {
            return {
                config: this.config
            };
        };
    }
})(angular);
