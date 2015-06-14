(function (angular) {
    'use strict';

    angular
        .module('app.core.cache')
        .config(htmlCacheBusterHttpInterceptor);

    // interceptor adds query string parameter with version number to invalidate browser cache
    function htmlCacheBusterHttpInterceptor($provide) {
        $provide.decorator('$http', extendHttp);
    }

    function extendHttp($delegate, configuration) {
        var get = $delegate.get;
        $delegate.get = function (url, config) {
            // Check is to avoid breaking AngularUI ui-bootstrap-tpls.js: "template/accordion/accordion-group.html"
            var isNotAngularUiTemplate = url.indexOf('template/');
            if (isNotAngularUiTemplate) {
                // Append ?v=[appVersion] to url
                url += (url.indexOf('?') === -1 ? '?' : '&');
                url += 'v=' + configuration.appVersion;
            }
            return get(url, config);
        };
        return $delegate;
    }
})(angular);
