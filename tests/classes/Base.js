const {Builder, By, Key, until} = require('selenium-webdriver');

class Base {
    constructor (timeOut = 10000) {
        this.driver = null;
        this.timeOut =timeOut;
    }

    async initialize () {
        this.driver = await new Builder()
            .forBrowser('chrome')
            .build();
    }

    async navigateTo (url) {
        await this.driver.get(url);
    }

    async findElement (element) {
        try {
            return await this.driver.findElement(element);
        } catch(err) {
            return false;
        }
    }

    /**
     * Return if element is Visible
     *
     * @param {WebElement} element
     * @returns
     * @memberof Base
     */
    async isElementVisible (element) {
        return await this.driver.wait(until.elementIsVisible(element), this.timeOut);
    }

    async destroy () {
        this.driver.quit();
    }
}

module.exports = Base;