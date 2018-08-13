const HomePage = require('../classes/HomePage');

describe('Testing HomePage',() => {
    let homePage = new HomePage();

    beforeEach(async() => {
        homePage = new HomePage();
        await homePage.initialize();
    });

    afterEach(async() => {
        await homePage.driver.sleep(1000);
        await homePage.destroy();
    });

    // it(`Page title should be "Angular week"`, async() => {
    //     await homePage.verifyTitle();
    // });

    it(`Skip button should by exist on tutorial's first page`, async() => {
        await homePage.skipButtonExistsAndIsVisible();
    });

    it(`Navigation buttons should by exist on tutorial's first page`, async() => {
        await homePage.navigationExistsAndIsVisible();
    });


});