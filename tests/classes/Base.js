const { Builder, By, Key, until } = require('selenium-webdriver');

class Base {
    constructor () {
        this.driver = new Builder()
            .forBrowser('chrome')
            .build();
    }
}