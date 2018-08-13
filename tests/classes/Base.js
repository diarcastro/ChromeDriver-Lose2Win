const {Builder, By, Key, until} = require('selenium-webdriver');
const fs = require('fs');

class Base {
    constructor (timeOut = 10000) {
        this.driver = null;
        this.timeOut =timeOut;
        this.screenShotsPath = './tests/screenshots/';
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
            return await this.driver.wait(until.elementLocated(element));
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

    async takeScreenShot(fileName = null) {
        if (!fileName) {
            const date = new Date();
            fileName = 'screenshot-' + date.getTime() + '.png';
        }

        if(fileName.indexOf('.png') < 0) {
            filenName += '.png';
        }

        const screenshot = await this.driver.takeScreenshot();
        fs.writeFileSync(this.screenShotsPath + fileName, screenshot, 'base64');
        return screenshot;
    } 

    async destroy () {
        this.driver.quit();
    }
}

module.exports = Base;