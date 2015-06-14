(function (angular) {
    'use strict';

    angular
        .module('app.seo')
        .factory('seoprDeltaClassProvider', seoprDeltaClassProvider);

    function seoprDeltaClassProvider() {

        return {
            getDeltaClass: getDeltaClass
        };

        function getDeltaClass(value, isAvailable) {

            var notAvailableDeltaClass = 'cell-not-available-delta';
            var noChangeDeltaClass = 'cell-no-change-delta';
            var negativeDeltaClassFormat = 'cell-negative-delta-%s';
            var positiveDeltaClassFormat = 'cell-positive-delta-%s';

            var className = notAvailableDeltaClass;

            if (isAvailable) {
                className = noChangeDeltaClass;

                var deltaLevel = getDeltaLevel(value);

                if (deltaLevel > 0) {
                    className = positiveDeltaClassFormat.format(deltaLevel);
                } else if (deltaLevel < 0) {
                    className = negativeDeltaClassFormat.format(deltaLevel * (-1));
                }
            }

            return className;
        }

        // private
        function getDeltaLevel(value) {
            // min and max percent values indicating colour change range
            var minPercent = -0.1,
                maxPercent = 0.1;
            // min and max step value for delta, used for css class
            var minLevel = -10,
                maxLevel = 10;
            var result = 0;

            if (value < minPercent) {
                result = minLevel;
            } else if (value > maxPercent) {
                result = maxLevel;
            } else {
                result = Math.floor(scaleValue(value, minLevel, maxLevel, minPercent, maxPercent));
            }

            return result;
        }

        function scaleValue(value, a, b, min, max) {
            return a + (b - a) * (value - min) / (max - min);
        }
    }
})(angular);
