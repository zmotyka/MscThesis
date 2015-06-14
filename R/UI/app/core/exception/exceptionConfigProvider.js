// Include in index.html so that app level exceptions are handled.
// Exclude from testRunner.html which should run exactly what it wants to run
(function (angular) {
    'use strict';

    angular
        .module('app.core.exception')
        .config(exceptionConfig);

    // Configure by setting an optional string value for appErrorPrefix.
    // Accessible via config.appErrorPrefix (via config value).
    function exceptionConfig($provide) {
        $provide.decorator('$exceptionHandler', extendExceptionHandler);
    }

    // Extend the $exceptionHandler service to also display a toast.
    function extendExceptionHandler($delegate, logger) {
        var appErrorPrefix = 'Error: ';
        return function (exception, cause) {
            $delegate(exception, cause);
            var errorData = { exception: exception, cause: cause };
            var msg = appErrorPrefix + exception.message;
            logger.error(msg, errorData);
        };
    }
})(angular);