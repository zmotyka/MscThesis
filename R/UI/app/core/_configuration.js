(function(angular, undefined) {
    angular.module("app.core.configuration", [])

    .constant("configuration", {
        "webApiEndpoint": "https://localhost/OneSearch.WebApi",
    })

    ;
})(angular);
