(function (angular) {
    'use strict';

    angular
        .module('app.common')
        .directive('cmLayoutMinimizeSidebar', cmLayoutMinimizeSidebar);

    function cmLayoutMinimizeSidebar() {
        //Usage:
        //<div cm-layout-minimize-sidebar></div>
        var directive = {
            restrict: 'A',
            templateUrl: 'modules/common/directives/layout/cm-layout-minimize-sidebar.html',
            controller: /*@ngInject*/ function ($scope, $element) {
                $scope.minimize = function () {
                    if ($('#sidebar > ul').is(":visible") === true) {
                        $('#page-wrapper').css({
                            'margin-left': '0px'
                        });
                        $('#sidebar').css({
                            'margin-left': '-210px'
                        });
                        $('#sidebar > ul').hide();
                        $("body").addClass("sidebar-closed");
                    } else {
                        $('#page-wrapper').css({
                            'margin-left': '210px'
                        });
                        $('#sidebar > ul').show();
                        $('#sidebar').css({
                            'margin-left': '0'
                        });
                        $("body").removeClass("sidebar-closed");
                    }
                };
            }
        };

        return directive;
    }
})(angular);
