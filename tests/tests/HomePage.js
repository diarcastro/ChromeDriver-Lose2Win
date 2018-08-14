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

    it(`Page title should be "Angular week"`, async() => {
        await homePage.verifyTitle();
    });
    
    it(`Skip button should by exist on tutorial's first page`, async() => {
        await homePage.skipButtonExistsAndIsVisible();
    });

    it(`Navigation buttons should by exist on tutorial's first page`, async() => {
        await homePage.navigationExistsAndIsVisible();
    });

    it(`Click on last navigation button must go to last tutorial page`, async() => {
        await homePage.goToLastTutorialPage();
    });

    it(`Click on skip button should go to conference schedule`, async() => {
        await homePage.skipTutorial();
    });

    it(`Should be found a conference with "CSS" onto its title`, async() => {
        await homePage.skipTutorial(false);
        await homePage.searchConference('CSS');
        await homePage.sleep(3);

    });


});