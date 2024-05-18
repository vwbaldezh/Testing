const { By, until } = require('selenium-webdriver');
const Page = require('../Page');

class AdvertisementsPage extends Page {
    constructor(driver) {
        super(driver);
        this.driver = driver;
        this.advertisementLink = By.xpath('//div[contains(@class, "listing-top")]//a[contains(@class, "listing-top__title-link")]'); 
    }

    async open() {
        await this.driver.get('https://av.by/');
    }

    async clickAdvertisementLink() {
        const element = await this.driver.wait(until.elementLocated(this.advertisementLink), 10000);
        await element.click();
    }
}

module.exports = AdvertisementsPage;
