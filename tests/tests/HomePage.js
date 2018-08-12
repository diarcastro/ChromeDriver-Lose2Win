const HomePage = require('../classes/HomePage');

describe('Testing HomePage',() => {
    let context = this;
    let homePage;

    beforeEach(async() => {
        homePage = new HomePage();
        await homePage.initialize();
    });

    it(`Page title should be "Angular week"`, async() => {
        await homePage.verifyTitle();
    });
});