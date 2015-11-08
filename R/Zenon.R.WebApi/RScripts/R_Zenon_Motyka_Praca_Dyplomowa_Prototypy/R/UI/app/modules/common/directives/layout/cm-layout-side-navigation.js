(function (angular) {
    'use strict';

    angular
        .module('app.common')
        .directive('cmLayoutSideNavigation', cmLayoutSideNavigation);

    /**
     * sideNavigation - Directive for run metsiMenu on sidebar navigation
    */
    function cmLayoutSideNavigation($timeout) {
        //Usage:
        //<div cm-layout-side-navigation></div>
        var directive = {
            restrict: 'A',
            templateUrl: 'modules/common/directives/layout/cm-layout-side-navigation.html',
            link: function (scope, element) {
                var navList = element.find('ul');
                // Call the plugin and plug it to sidebar navigation
                // hack: timeout without time specified - wait until the end of the $digest cycle
                $timeout(function () {
                    element.find('#nav-accordion').dcAccordion({
                        eventType: 'click',
                        autoClose: true,
                        saveState: true,
                        disableLink: true,
                        speed: 'fast',
                        showCount: false,
                        autoExpand: true,
                        classExpand: 'dcjq-current-parent'
                    });

                    // Minimalize menu when screen is less than 768px
                    setNavigationState(navList);
                    angular.element(window).bind("resize", function () {
                        setNavigationState(navList);
                    });

                    // hide menu when clicked on any leaf anchor
                    element.find('li:not(.sub-menu) > a').click(function () {
                        if (!angular.element('body').hasClass('sidebar-close')) {
                            navList.hide();
                        }
                    });
                });
            }
        };

        return directive;

        function setNavigationState(navList) {
            if (window.innerWidth > 769) {
                angular.element('body').addClass('sidebar-close');
                navList.show();
            } else {
                angular.element('body').removeClass('sidebar-close');
                navList.hide();
            }
        }
    }
})(angular);
