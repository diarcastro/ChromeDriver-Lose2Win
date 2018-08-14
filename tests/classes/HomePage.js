const Base = require('./Base');
const { By, until } = require('selenium-webdriver');
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
        this.screenShotsPath += 'home-';
        this.setSelectors();
    }

    setSelectors () {
        this.selectors = {
            skipButton: By.css('body > ion-app > ng-component > ion-split-pane > ion-nav > page-tutorial > ion-header > ion-navbar > ion-buttons > button'),
            navigationButtons: By.css('body > ion-app > ng-component > ion-split-pane > ion-nav > page-tutorial > ion-content > div.scroll-content > ion-slides > div > div.swiper-pagination.swiper-pagination-clickable.swiper-pagination-bullets'),
            searchInput: By.xpath('//*[@id="tabpanel-t1-0"]/page-schedule/ion-header/ion-toolbar/div[2]/ion-searchbar/div/input'),
        };
    }

    async verifyTitle () {
        const title = await this.driver.getTitle();
        assert.isDefined(title);
        return assert.isTrue(title === this.pageTitle, `Page title was not ${this.pageTitle}`);
    }

    async skipButtonExistsAndIsVisible() {
        const skipButton = await this.findElement(this.selectors.skipButton);
        assert.isDefined(skipButton, 'SkipButton was not found!');
    }

    async skipButtonExistsAndIsVisible() {
        const skipButton = await this.findElement(this.selectors.skipButton);
        assert.isDefined(skipButton, 'SkipButton was not found!');
        const isVisible = await this.isElementVisible(skipButton);
        assert.isDefined(isVisible, 'SkipButton was not visible! ' + isVisible);
    }
    
    async navigationExistsAndIsVisible() {
        const navigation = await this.findElement(this.selectors.navigationButtons);
        assert.isDefined(navigation, 'navigation was not found!');
        const isVisible = await this.isElementVisible(navigation);
        assert.isDefined(isVisible, 'navigation was not visible! ' + isVisible);
    }
    
    async goToLastTutorialPage () {
        const navigation = await this.findElement(this.selectors.navigationButtons);
        await this.driver.sleep(500);
        const navigationButtons = await navigation.findElements(By.css('button'));
        const lastButton = navigationButtons[navigationButtons.length - 1];
        await lastButton.click();
        const classes = await lastButton.getAttribute('class');
        const classExists = classes.indexOf('swiper-pagination-bullet-active') >= 0;
        assert.isTrue(classExists, 'Button must contain the class "swiper-pagination-bullet-active"')
        await this.takeScreenShot();
    }

    
    async skipTutorial () {
        const skipButton = await this.findElement(this.selectors.skipButton);
        skipButton.click();
        await this.driver.sleep(500);
        const currentUrl = await this.driver.getCurrentUrl();
        assert.isTrue(currentUrl.indexOf('conference-schedule/schedule') >=0, 'The current url should contain "conference-schedule/schedule"' +  currentUrl);
    }

}

module.exports = HomePage;