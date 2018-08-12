const Base = require('./Base');
const { assert } = require('chai');

class HomePage extends Base {
    constructor () {
        super();
        this.pageTitle = 'Angular Week';
        this.pageUrl = 'https://pwa.angularweek.org/';
    }

    async initialize () {
        await super.initialize();
        await this.navigateTo(this.pageUrl);
    }

    async verifyTitle () {
        const title = await this.driver.getTitle();
        assert.isDefined(title);
        return assert.isTrue(title === this.pageTitle, `Page title was not ${this.pageTitle}`);
    }
}

module.exports = HomePage;