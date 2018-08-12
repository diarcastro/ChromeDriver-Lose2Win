const {Builder, By, Key, until} = require('selenium-webdriver');

class Base {
    constructor () {
        this.driver = null;
    }

    async initialize () {
        this.driver = await new Builder()
            .forBrowser('chrome')
            .build();
    }

    async navigateTo (url) {
        await this.driver.get(url);
    }

    async destroy () {
        this.driver.quit();
    }
}

module.exports = Base;