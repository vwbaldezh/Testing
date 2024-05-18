const { By, until } = require('selenium-webdriver');
const Page = require('../Page');

class MyAdsPage extends Page {
    constructor(driver) {
        super(driver);
        this.profileIcon = By.xpath('//a[@class="nav__link"]');
        this.myAdsLink = By.xpath('//a[contains(@href, "/profile/offers")]');
        this.pageHeader = By.xpath('//a[@class="sidenav__link sidenav__link--active" and @href="https://av.by/profile/offers"]/span[contains(text(), "Мои объявления")]');   
    }

    async clickProfileIcon() {
        const element = await this.driver.findElement(this.profileIcon);
        await element.click();
    }

    async clickMyAdsLink() {
        const element = await this.driver.wait(until.elementLocated(this.myAdsLink), 10000);
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", element);
        await element.click();
    }

    async verifyPageLoaded() {
        const element = await this.driver.wait(until.elementLocated(this.pageHeader), 10000);
        return await element.isDisplayed();
    }
}

module.exports = MyAdsPage;
