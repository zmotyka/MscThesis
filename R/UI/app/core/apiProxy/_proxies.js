(function(angular, $) {
    "use strict";

    if (!$) {
        throw 'jQuery is not defined';
    }

    if (!angular) {
        throw 'angular is not defined';
    }

    var module = angular.module('app.apiProxy', []);

    module.provider('apiProxy', function() {
        var provider = this;
        provider.baseUrl = '';
        provider.setBaseUrl = function(url) {
            provider.baseUrl = url;
        };

        provider.$get = ['$http', function($http) {
            var service = {};

            /* Proxies */
            service.adwordsAccount = {
                defaultOptions: {},
                antiForgeryToken: defaultAntiForgeryTokenAccessor,
                get: function(additionalParameters) {
                    return invoke.call(this, $http, "/api/proxy/adwordsAccount/get", "get",
                        angular.extend({},
                            additionalParameters)
                    );
                },
            };
            service.alert = {
                defaultOptions: {},
                antiForgeryToken: defaultAntiForgeryTokenAccessor,
                get: function(entityId, alertId, additionalParameters) {
                    return invoke.call(this, $http, "/api/proxy/alert/get", "get",
                        angular.extend({}, {
                            entityId: arguments[0],
                            alertId: arguments[1],
                        }, additionalParameters)
                    );
                },
                post: function(entityId, alertId, additionalParameters) {
                    return invoke.call(this, $http, "/api/proxy/alert/post", "post",
                        angular.extend({}, {
                            entityId: arguments[0],
                            alertId: arguments[1],
                        }, additionalParameters)
                    );
                },
            };
            service.alertSummary = {
                defaultOptions: {},
                antiForgeryToken: defaultAntiForgeryTokenAccessor,
                get: function(entityId, severityId, additionalParameters) {
                    return invoke.call(this, $http, "/api/proxy/alertSummary/get", "get",
                        angular.extend({}, {
                            entityId: arguments[0],
                            severityId: arguments[1],
                        }, additionalParameters)
                    );
                },
            };
            service.pageReportClassification = {
                defaultOptions: {},
                antiForgeryToken: defaultAntiForgeryTokenAccessor,
                get: function(additionalParameters) {
                    return invoke.call(this, $http, "/api/proxy/pageReportClassification/get", "get",
                        angular.extend({},
                            additionalParameters)
                    );
                },
            };
            service.entityAlertSummary = {
                defaultOptions: {},
                antiForgeryToken: defaultAntiForgeryTokenAccessor,
                get: function(entityId, additionalParameters) {
                    return invoke.call(this, $http, "/api/proxy/entityAlertSummary/get", "get",
                        angular.extend({}, {
                            entityId: arguments[0],
                        }, additionalParameters)
                    );
                },
            };
            service.pageHierarchy = {
                defaultOptions: {},
                antiForgeryToken: defaultAntiForgeryTokenAccessor,
                getReport: function(reportRequest, parentId, additionalParameters) {
                    return invoke.call(this, $http, "/api/proxy/pageHierarchy/getReport", "post",
                        angular.extend({}, {
                            parentId: arguments[1],
                        }, additionalParameters), arguments[0]);
                },
                getSampleReport: function(reportRequest, parentId, additionalParameters) {
                    return invoke.call(this, $http, "/api/proxy/pageHierarchy/getSampleReport", "post",
                        angular.extend({}, {
                            parentId: arguments[1],
                        }, additionalParameters), arguments[0]);
                },
            };
            service.program = {
                defaultOptions: {},
                antiForgeryToken: defaultAntiForgeryTokenAccessor,
                get: function(additionalParameters) {
                    return invoke.call(this, $http, "/api/proxy/program/get", "get",
                        angular.extend({},
                            additionalParameters)
                    );
                },
            };
            service.security = {
                defaultOptions: {},
                antiForgeryToken: defaultAntiForgeryTokenAccessor,
                login: function(login, additionalParameters) {
                    return invoke.call(this, $http, "/api/proxy/security/login", "post",
                        angular.extend({},
                            additionalParameters), arguments[0]);
                },
                resetPassword: function(username, additionalParameters) {
                    return invoke.call(this, $http, "/api/proxy/security/resetPassword", "post",
                        angular.extend({},
                            additionalParameters), arguments[0]);
                },
                relogin: function(serialisedSecurityToken, additionalParameters) {
                    return invoke.call(this, $http, "/api/proxy/security/relogin", "post",
                        angular.extend({},
                            additionalParameters), arguments[0]);
                },
                renewSecurityToken: function(token, additionalParameters) {
                    return invoke.call(this, $http, "/api/proxy/security/renewSecurityToken", "post",
                        angular.extend({},
                            additionalParameters), arguments[0]);
                },
            };
            service.userAdwordsAccount = {
                defaultOptions: {},
                antiForgeryToken: defaultAntiForgeryTokenAccessor,
                get: function(additionalParameters) {
                    return invoke.call(this, $http, "/api/proxy/userAdwordsAccount/get", "get",
                        angular.extend({},
                            additionalParameters)
                    );
                },
                post: function(userId, adWordsAccounts, additionalParameters) {
                    return invoke.call(this, $http, "/api/proxy/userAdwordsAccount/post", "post",
                        angular.extend({}, {
                            userId: arguments[0],
                        }, additionalParameters), arguments[1]);
                },
            };

            return service;
        }];

        return provider;

        function getQueryString(params, queryString) {
            queryString = queryString || "";
            for (var prop in params) {
                if (params.hasOwnProperty(prop)) {
                    var val = getArgValue(params[prop]);
                    if (val === null) continue;

                    if ("" + val === "[object Object]") {
                        queryString = getQueryString(params[prop], queryString);
                        continue;
                    }

                    if (queryString.length) {
                        queryString += "&";
                    } else {
                        queryString += "?";
                    }
                    queryString = queryString + prop + "=" + encodeURIComponent(val);
                }
            }
            return queryString;
        }

        function getArgValue(val) {
            if (val === undefined || val === null) return null;
            return val;
        }

        function invoke($http, url, method, urlParams, body) {
            url = provider.baseUrl + url + getQueryString(urlParams);

            var ajaxOptions = angular.extend(this.defaultOptions, {
                url: url,
                method: method
            });

            if (body) {
                ajaxOptions.data = body;
            }

            return $http(ajaxOptions);
        };

        function defaultAntiForgeryTokenAccessor() {
            return $("input[name=__RequestVerificationToken]").val();
        };
    });
})(window.angular, jQuery);
