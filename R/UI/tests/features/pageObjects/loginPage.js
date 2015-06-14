module.exports = {
    goToPage: function () {
        browser.get('http://localhost:9000/#/');
    },
    defaultLogin: function () {
        return browser.get('#/login').then(function () {
            element(by.model('loginVm.username')).sendKeys('zenonmotyka@greenlightdigital.com');
            element(by.model('loginVm.password')).sendKeys('test_password');
            return element(by.id('loginButton')).click();
        });
    }
}