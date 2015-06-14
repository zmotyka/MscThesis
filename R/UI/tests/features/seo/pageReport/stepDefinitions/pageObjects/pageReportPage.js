module.exports = {
    goToPage: function () {
        return browser.get('#/page-report//87a47ce0-2e44-4466-b896-be9f4d3aa42f/');
    },
    isWeeklyButtonEnabled: function() {
        return getWeeklyButton().isEnabled();
    },
    getWeeklyButton: function () {
        return getWeeklyButton();
    },
    clickWeeklyButton: function() {
        return getWeeklyButton().click();
    },
    clickMonthlyButton: function () {
        return element(by.css('.monthly-range-button')).click();
    },
    getSummaryItemByModel: function() {
        return element(by.model('pageReportVm.currentGroup'));
    },
    getDeltaCellsOfSummaryItemRow: function () {
        return element
            .all(by.css('.page-report-grid .k-grid-footer-wrap .k-footer-template'))
            .first()
            .all(by.css('.cell-delta'));
    },
    getDeltaCellsOfFirstGridRow: function () {
        return element
            .all(by.css('.page-report-grid .k-grid-content tr'))
            .first()
            .all(by.css('.cell-delta'));
    },
    getNameOfFirstGridRow: function() {
        return element.all(by.css('.page-report-grid .page-name'))
            .first()
            .getText();
    },
    getNameAnchorOfFirstGridRow: function () {
        return element.all(by.css('.page-report-grid .page-name'))
            .first()
            .all(by.tagName('a'))
            .filter(function(elem) {
                return elem.isDisplayed(); 
            })
            .first();
    },
    getDeltaCellText: function (deltaCells, index) {
        return deltaCells.get(index).element(by.css('.delta-value')).getInnerHtml();
    },
    getActualCellText: function (deltaCells, index) {
        return deltaCells.get(index).element(by.css('.actual-value')).getInnerHtml();
    },
    getCurrentGroupTitle: function () {
        return element(by.css('.current-group-title'));
    },
    getCurrentGroupTitleAnchor: function () {
        return element(by.css('.current-group-title')).element(by.tagName('a'));
    }
}

function getWeeklyButton() {
    return element(by.css('.weekly-range-button'));
}