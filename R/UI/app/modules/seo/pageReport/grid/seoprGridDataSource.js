(function (angular) {
    'use strict';

    angular
        .module('app.seo')
        .factory('seoprGridDataSource', seoprGridDataSource);

    function seoprGridDataSource(seoprGridHelper) {
        return {
            getDataSource: getDataSource,
            getColumnsDefinition: getColumnsDefinition
        };
        
        function getDataSource(getReadFn) {
            return new kendo.data.DataSource({
                transport: seoprGridHelper.getTransport(getReadFn),
                serverAggregates: true,
                aggregate: [
                    { field: 'deltaPageCount', aggregate: 'sum' },
                    { field: 'deltaKeywordCount', aggregate: 'sum' },
                    { field: 'deltaVolume', aggregate: 'sum' },
                    { field: 'deltaReach', aggregate: 'sum' },
                    { field: 'deltaReachPercentage', aggregate: 'sum' },
                    { field: 'deltaRank', aggregate: 'sum' },
                    { field: 'deltaTraffic', aggregate: 'sum' },
                    { field: 'deltaOrders', aggregate: 'sum' },
                    { field: 'deltaRevenue', aggregate: 'sum' },
                    { field: 'deltaCvr', aggregate: 'sum' },
                ],
                schema: {
                    data: function (data) { return data.items; },
                    total: function (data) { return data.totalItems; },
                    model: {
                        fields: {
                            name: { type: 'string' },
                            deltaPageCount: { type: 'number' },
                            deltaKeywordCount: { type: 'number' },
                            deltaVolume: { type: 'number' },
                            deltaReach: { type: 'number' },
                            deltaReachPercentage: { type: 'number' },
                            deltaRank: { type: 'number' },
                            deltaTraffic: { type: 'number' },
                            deltaOrders: { type: 'number' },
                            deltaRevenue: { type: 'number' },
                            deltaCvr: { type: 'number' },
                        }
                    },
                    aggregates: function (response) {
                        var summary = response.summaryItem;
                        var result = {
                            deltaKeywordCount: {
                                sum: summary.keywordCount,
                                sumDelta: summary.deltaKeywordCount
                            },
                            deltaPageCount: {
                                sum: summary.pageCount,
                                sumDelta: summary.deltaPageCount
                            },
                            deltaVolume: {
                                sum: summary.volume,
                                sumDelta: summary.deltaVolume
                            },
                            deltaReach: {
                                sum: summary.reach,
                                sumDelta: summary.deltaReach
                            },
                            deltaReachPercentage: {
                                sum: summary.reachPercentage,
                                sumDelta: summary.deltaReachPercentage
                            },
                            deltaRank: {
                                sum: summary.rank,
                                sumDelta: summary.deltaRank
                            },
                            deltaTraffic: {
                                sum: summary.traffic,
                                sumDelta: summary.deltaTraffic
                            },
                            deltaOrders: {
                                sum: summary.orders,
                                sumDelta: summary.deltaOrders
                            },
                            deltaRevenue: {
                                sum: summary.revenue,
                                sumDelta: summary.deltaRevenue
                            },
                            deltaCvr: {
                                sum: summary.cvr,
                                sumDelta: summary.deltaCvr
                            },
                        };
                        return result;
                    }
                },
                pageSize: 100,
                serverPaging: true,
                serverSorting: true,
            });
        }

        function getColumnsDefinition() {
            var shouldFixNameColumn = seoprGridHelper.shouldFixNameColumn();
            var nameColumnWidth = seoprGridHelper.getNameColumnWidth();
            var numericColWidth = 95;
            return [
                { field: 'name', title: 'Name', locked: shouldFixNameColumn, width: nameColumnWidth, template: seoprGridHelper.getNameTemplate(), footerTemplate: seoprGridHelper.getSummaryFooterTemplate() },
                { field: 'deltaPageCount', title: 'Pages', width: numericColWidth, template: seoprGridHelper.getValueTemplate('data.deltaPageCount', 'data.pageCount', '{0:n0}'), footerTemplate: seoprGridHelper.getValueTemplate('sumDelta', 'sum', '{0:n0}') },
                { field: 'deltaKeywordCount', title: 'Keywords', width: numericColWidth, template: seoprGridHelper.getValueTemplate('data.deltaKeywordCount', 'data.keywordCount', '{0:n0}'), footerTemplate: seoprGridHelper.getValueTemplate('sumDelta', 'sum', '{0:n0}') },
                { field: 'deltaVolume', title: 'Volume', width: numericColWidth, template: seoprGridHelper.getValueTemplate('data.deltaVolume', 'data.volume', '{0:n1}'), footerTemplate: seoprGridHelper.getValueTemplate('sumDelta', 'sum', '{0:n1}') },
                { field: 'deltaReach', title: 'Reach', width: numericColWidth, template: seoprGridHelper.getValueTemplate('data.deltaReach', 'data.reach', '{0:n1}'), footerTemplate: seoprGridHelper.getValueTemplate('sumDelta', 'sum', '{0:n1}') },
                { field: 'deltaReachPercentage', title: 'Reach%', width: numericColWidth, template: seoprGridHelper.getValueTemplate('data.deltaReachPercentage', 'data.reachPercentage', '{0:0.00%}'), footerTemplate: seoprGridHelper.getValueTemplate('sumDelta', 'sum', '{0:0.00%}') },
                { field: 'deltaRank', title: 'Rank', width: numericColWidth, template: seoprGridHelper.getRankValueTemplate('data.deltaRank', 'data.rank', '{0:n1}'), footerTemplate: seoprGridHelper.getRankValueTemplate('sumDelta', 'sum') },
                { field: 'deltaTraffic', title: 'Traffic', width: numericColWidth, template: seoprGridHelper.getValueTemplate('data.deltaTraffic', 'data.traffic', '{0:n0}'), footerTemplate: seoprGridHelper.getValueTemplate('sumDelta', 'sum', '{0:n0}') },
                { field: 'deltaOrders', title: 'Orders', width: numericColWidth, template: seoprGridHelper.getValueTemplate('data.deltaOrders', 'data.orders', '{0:n0}'), footerTemplate: seoprGridHelper.getValueTemplate('sumDelta', 'sum', '{0:n0}') },
                { field: 'deltaRevenue', title: 'Revenue', width: numericColWidth, template: seoprGridHelper.getValueTemplate('data.deltaRevenue', 'data.revenue', '£{0:n2}'), footerTemplate: seoprGridHelper.getValueTemplate('sumDelta', 'sum', '£{0:n2}') },
                { field: 'deltaCvr', title: 'Cvr', width: numericColWidth, template: seoprGridHelper.getValueTemplate('data.deltaCvr', 'data.cvr', '{0:0.00%}'), footerTemplate: seoprGridHelper.getValueTemplate('sumDelta', 'sum', '{0:0.00%}') }
            ];
        }
    }
})(angular);
