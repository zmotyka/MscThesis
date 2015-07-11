(function (angular) {
    'use strict';

    angular.module('app.common')
        .filter('toTrusted', function ($sce) {
            return function (text) {
                return $sce.trustAsHtml(text);
            };
        });
})(angular);

