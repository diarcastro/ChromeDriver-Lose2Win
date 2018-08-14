const {Builder, By, Key, until, chromeOptions} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');

class Base {
    constructor (timeOut = 10000) {
        this.driver = null;
        this.timeOut =timeOut;
        this.screenShotsPath = './tests/screenshots/';
    }

    async initialize (mobileName/*  = 'iPhone 6/7/8' */) {
        let chromeOptions = null;
        if (mobileName) {
            chromeOptions = new chrome.Options();
            chromeOptions.setMobileEmulation({deviceName: mobileName});
            // Responsive windows
            // chromeOptions = new chrome.Options().windowSize({width: 375, height: 600});
        }
        
        console.log('Stablishing chromeOptions', chromeOptions);
        this.driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(chromeOptions || {})
            .build();
    }

    async navigateTo (url) {
        await this.driver.get(url);
    }
    /**
     * Return an DOM Element
     *
     * @param {*} element
     * @returns {WebElement} Element found it
     * @memberof Base
     */
    async findElement (element) {
        try {
            return await this.driver.wait(until.elementLocated(element), this.timeOut);
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

    async sleep (seconds) {
        return await this.driver.sleep(seconds * 1000);
    }

    async destroy () {
        this.driver.quit();
    }
}

module.exports = Base;