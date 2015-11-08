/* global toastr:false, moment:false, kendo:false */
(function (angular) {
    'use strict';

    angular
        .module('app.core')
        .constant('moment', moment)
        .constant('toastr', toastr);
})(angular);
