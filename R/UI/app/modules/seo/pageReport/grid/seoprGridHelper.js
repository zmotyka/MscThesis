(function (angular) {
    'use strict';

    angular
        .module('app.seo')
        .factory('seoprGridHelper', seoprGridHelper);

    function seoprGridHelper(cmNumber, $window) {
        return {
            getTransport: getTransport,
            getValueTemplate: getValueTemplate,
            getRankValueTemplate: getRankValueTemplate,
            getNameTemplate: getNameTemplate,
            getSummaryFooterTemplate: getSummaryFooterTemplate,
            shouldFixNameColumn: shouldFixNameColumn,
            getNameColumnWidth: getNameColumnWidth,
            isGridInMobileMode: isGridInMobileMode,
            getGridHeight: getGridHeight
        };
        
        function getTransport(getReadFn) {
            return {
                read: function (options) {
                    return getReadFn(options.data).then(function (data) {
                        options.success(data);
                    }).catch(function (error) {
                        options.error(error);
                    }); 
                }
            };
        }

        function getValueTemplate(deltaValueSelector, valueSelector, valueFormatting) {
            // % sign multiplies value by 100 and appends % in the result string
            var deltaValueFormatting = '{0:0.00%}';
            if (!valueFormatting) {
                valueFormatting = '{0:n2}';
            }

            var deltaSelector =
                '#:' + deltaValueSelector + ' > 0 ? "+" : "" #' + // add plus sign if value is positive
                '#:' + deltaValueSelector + ' != null ? kendo.format(\'' + deltaValueFormatting + '\', ' + deltaValueSelector + ') : "-" #';

            var actualSelector =
                '#:' + valueSelector + ' != null ? kendo.format(\'' + valueFormatting + '\', ' + valueSelector + ') : "-" #';
            var deltaClassFnText = 'pageReportGridVm.getDeltaClass(#:' + deltaValueSelector + '#)';

            return getNumericTemplate(deltaSelector, actualSelector, deltaClassFnText);
        }

        function getRankValueTemplate(deltaValueSelector, valueSelector, valueFormatting) {
            var deltaValueFormatting = '{0:0.00%}';
            if (!valueFormatting) {
                valueFormatting = '{0:n1}';
            }

            var deltaSelector =
                '#:' + deltaValueSelector + ' != null ' +
                    '? ' + deltaValueSelector + ' == ' + cmNumber.NOT_RANKED +
                        '? "N/R"' +
                        ': (' + deltaValueSelector + ' > 0 ? "+" : "") + kendo.format(\'' + deltaValueFormatting + '\', ' + deltaValueSelector + ') ' +
                    ': "-"' +
                '#';
            var actualSelector =
                '#:' + valueSelector + ' != null ' +
                    '? ' + valueSelector + ' == ' + cmNumber.NOT_RANKED +
                        '? "N/R"' +
                        ': kendo.format(\'' + valueFormatting + '\', ' + valueSelector + ') ' +
                    ': "-"' +
                '#';

            var deltaClassFnText = 'pageReportGridVm.getRankDeltaClass(#:' + deltaValueSelector + '#)';
            return getNumericTemplate(deltaSelector, actualSelector, deltaClassFnText);
        }

        function getNumericTemplate(deltaValueSelector, actualValueSelector, getDeltaClassFnText) {
            return '' +
                '<div class="numeric cell-delta" ' +
                    'ng-class="' + getDeltaClassFnText + '">' +
                    '<div class="delta-value">' +
                        deltaValueSelector +
                    '</div>' +
                    '<div class="actual-value">' + actualValueSelector + '</div>' +
                '</div>';
        }

        function getNameTemplate() {
            return '' +
                '<span class="page-name">' +
                    '# if(!data.url){ #' +
                        '<a class="inline" ng-click="pageReportGridVm.navigateTo(\'#: data.id #\')">#: data.name #</a>' +
                    '# } else { #' +
                        '<span class="hidden-xs hidden-sm">' +
                            '<a href="#: data.url #" ng-show="#: !!data.url #" target="_blank" data-tooltip="#: data.url #" data-tooltip-append-to-body="true" data-tooltip-placement="top"' +
                                'class="btn btn-outline btn-default btn-sm inline m-l-sm m-r-sm"><i class="fa fa-link"></i></a>' +
                            '<span class="inline">#: data.name # </span>' +
                        '</span>' +
                        '<a class="hidden-md hidden-lg" href="#: data.url #" ng-show="#: !!data.url #" target="_blank">' +
                            '#: data.name #' +
                        '</a>' +
                    '# } #' +
                '</span>';
        }

        function getSummaryFooterTemplate() {
            return '<div class="summary-footer">Totals</div>';
        }

        function shouldFixNameColumn() {
            return $window.innerWidth < 1200;
        }

        function isGridInMobileMode() {
            return $window.innerWidth < 700;
        }

        function getGridHeight() {
            var minGridHeight = 800;
            var initialHeight = $window.innerHeight < minGridHeight
                ? minGridHeight
                : $window.innerHeight;

            return initialHeight - 200;
        }

        function getNameColumnWidth() {
            var result = null;

            if (shouldFixNameColumn()) {
                result = $window.innerWidth / 3;
            }

            return result;
        }
    }
})(angular);
