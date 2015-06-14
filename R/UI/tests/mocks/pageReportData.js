
module.exports = [
    // default
    // first entry
    {
        request: {
            path: '/pageHierarchy/getReport',
            method: 'POST',
            queryString: {
                parentId: '11111111-1111-1111-1111-111111111111'
            },
            data: {
                start: 0,
                length: 100,
                dateRange: {
                    range: 'LastWeek'
                }
            }
        },
        response: {
            data: {
                summaryItem: {
                    id: '11111111-1111-1111-1111-111111111111',
                    parentId: null,
                    name: 'Home Page',
                    url: null,
                    pageCount: 42104,
                    keywordCount: 65843,
                    volume: 6565190.0,
                    rank: 9.6,
                    reach: 743286.9,
                    reachPercentage: 0.2537,
                    traffic: 762432,
                    orders: 7532,
                    revenue: 8954.42543,
                    cvr: 0.32442,
                    deltaPageCount: 0.32432,
                    deltaKeywordCount: 0.43254,
                    deltaVolume: -0.34324,
                    deltaRank: 0.32543,
                    deltaReach: 0.3443543,
                    deltaReachPercentage: 0.3243534,
                    deltaTraffic: 0.76245,
                    deltaOrders: -0.845,
                    deltaRevenue: -0.23352,
                    deltaCvr: 0.43433
                },
                totalItems: 2,
                items: [
                    {
                        id: '6871ec86-70a1-4fb6-8566-1acc45b2207d',
                        parentId: '11111111-1111-1111-1111-111111111111',
                        name: 'Kitchen Appliances',
                        url: null,
                        pageCount: 0,
                        keywordCount: 0,
                        volume: 0.0,
                        rank: 0.0,
                        reach: 0.0,
                        reachPercentage: 0.0,
                        traffic: 0,
                        orders: 0,
                        revenue: 0.0,
                        cvr: 0.0,
                        deltaPageCount: 0.0,
                        deltaKeywordCount: 0.0,
                        deltaVolume: 0.0,
                        deltaRank: 0.0,
                        deltaReach: 0.0,
                        deltaReachPercentage: 0.0,
                        deltaTraffic: 0.0,
                        deltaOrders: 0.0,
                        deltaRevenue: 0.0,
                        deltaCvr: 0.0
                    }, {
                        id: '99cfec52-b143-4f3d-b602-ebb9b858ad58',
                        parentId: '11111111-1111-1111-1111-111111111111',
                        name: 'Small Appliances',
                        url: null,
                        pageCount: 232104,
                        keywordCount: 54223,
                        volume: 160.0,
                        rank: 7.2,
                        reach: 52432.0,
                        reachPercentage: 0.2254523,
                        traffic: 23432,
                        orders: 532,
                        revenue: 8943.2543,
                        cvr: 0.32442,
                        deltaPageCount: -0.3234,
                        deltaKeywordCount: 0.432345,
                        deltaVolume: -0.234324,
                        deltaRank: 3.2543,
                        deltaReach: 0.6343543,
                        deltaReachPercentage: -0.3243534,
                        deltaTraffic: 0.43642,
                        deltaOrders: -0.42652,
                        deltaRevenue: -0.3242352,
                        deltaCvr: 0.13433
                    }
                ]
            },
            status: 200
        }
    },
    // second entry
    {
        request: {
            path: '/pageHierarchy/getReport',
            method: 'POST',
            queryString: {
                parentId: '11111111-1111-1111-1111-111111111111'
            },
            data: {
                start: 0,
                length: 100,
                dateRange: {
                    range: 'LastMonth'
                }
            }
        },
        response: {
            data: {
                summaryItem: {
                    id: '11111111-1111-1111-1111-111111111111',
                    parentId: null,
                    name: 'Home Page',
                    url: null,
                    pageCount: 142104,
                    keywordCount: 165843,
                    volume: 16565190.0,
                    rank: 19.6,
                    reach: 1743286.9,
                    reachPercentage: 0.12537,
                    traffic: 1762432,
                    orders: 17532,
                    revenue: 18954.42543,
                    cvr: 0.132442,
                    deltaPageCount: 0.132432,
                    deltaKeywordCount: 0.143254,
                    deltaVolume: -0.134324,
                    deltaRank: 0.132543,
                    deltaReach: 0.13443543,
                    deltaReachPercentage: 0.13243534,
                    deltaTraffic: 0.176245,
                    deltaOrders: -0.1845,
                    deltaRevenue: -0.123352,
                    deltaCvr: 0.143433
                },
                totalItems: 2,
                items: [
                    {
                        id: '6871ec86-70a1-4fb6-8566-1acc45b2207d',
                        parentId: '11111111-1111-1111-1111-111111111111',
                        name: 'Kitchen Appliances',
                        url: null,
                        pageCount: 10,
                        keywordCount: 10,
                        volume: 0.10,
                        rank: 0.10,
                        reach: 0.10,
                        reachPercentage: 0.10,
                        traffic: 10,
                        orders: 10,
                        revenue: 0.10,
                        cvr: 0.10,
                        deltaPageCount: 0.10,
                        deltaKeywordCount: 0.10,
                        deltaVolume: 0.10,
                        deltaRank: 0.10,
                        deltaReach: 0.10,
                        deltaReachPercentage: 0.10,
                        deltaTraffic: 0.10,
                        deltaOrders: 0.10,
                        deltaRevenue: 0.10,
                        deltaCvr: 0.10
                    }, {
                        id: '99cfec52-b143-4f3d-b602-ebb9b858ad58',
                        parentId: '11111111-1111-1111-1111-111111111111',
                        name: 'Small Appliances',
                        url: null,
                        pageCount: 1232104,
                        keywordCount: 154223,
                        volume: 1160.0,
                        rank: 17.2,
                        reach: 152432.0,
                        reachPercentage: 0.12254523,
                        traffic: 123432,
                        orders: 1532,
                        revenue: 18943.2543,
                        cvr: 0.132442,
                        deltaPageCount: -0.13234,
                        deltaKeywordCount: 0.1432345,
                        deltaVolume: -0.1234324,
                        deltaRank: 3.12543,
                        deltaReach: 0.16343543,
                        deltaReachPercentage: -0.13243534,
                        deltaTraffic: 0.143642,
                        deltaOrders: -0.142652,
                        deltaRevenue: -0.13242352,
                        deltaCvr: 0.113433
                    }
                ]
            },
            status: 200
        }
    },
    // child node
    // Kitchen Appliances LastWeek 6871ec86-70a1-4fb6-8566-1acc45b2207d
    {
        request: {
            path: '/pageHierarchy/getReport',
            method: 'POST',
            queryString: {
                parentId: '6871ec86-70a1-4fb6-8566-1acc45b2207d'
            },
            data: {
                start: 0,
                length: 100,
                dateRange: {
                    range: 'LastWeek'
                }
            }
        },
        response: {
            data: {
                summaryItem: {
                    id: '6871ec86-70a1-4fb6-8566-1acc45b2207d',
                    parentId: '11111111-1111-1111-1111-111111111111',
                    name: 'Kitchen Appliances',
                    url: null,
                    pageCount: 42104,
                    keywordCount: 65843,
                    volume: 6565190.0,
                    rank: 9.6,
                    reach: 743286.9,
                    reachPercentage: 0.2537,
                    traffic: 762432,
                    orders: 7532,
                    revenue: 8954.42543,
                    cvr: 0.32442,
                    deltaPageCount: 0.32432,
                    deltaKeywordCount: 0.43254,
                    deltaVolume: -0.34324,
                    deltaRank: 0.32543,
                    deltaReach: 0.3443543,
                    deltaReachPercentage: 0.3243534,
                    deltaTraffic: 0.76245,
                    deltaOrders: -0.845,
                    deltaRevenue: -0.23352,
                    deltaCvr: 0.43433
                },
                totalItems: 1,
                items: [
                    {
                        id: '1871ec86-70a1-4fb6-8566-1acc45b2207d',
                        parentId: '6871ec86-70a1-4fb6-8566-1acc45b2207d',
                        name: 'Kitchen Appliances Page',
                        url: 'http://www.currys.co.uk/gbuk/household-appliances-35-u.html',
                        pageCount: 1,
                        keywordCount: 10,
                        volume: 0.10,
                        rank: 0.10,
                        reach: 0.10,
                        reachPercentage: 0.10,
                        traffic: 10,
                        orders: 10,
                        revenue: 0.10,
                        cvr: 0.10,
                        deltaPageCount: 0.10,
                        deltaKeywordCount: 0.10,
                        deltaVolume: 0.10,
                        deltaRank: 0.10,
                        deltaReach: 0.10,
                        deltaReachPercentage: 0.10,
                        deltaTraffic: 0.10,
                        deltaOrders: 0.10,
                        deltaRevenue: 0.10,
                        deltaCvr: 0.10
                    }
                ]
            },
            status: 200
        }
    }

];