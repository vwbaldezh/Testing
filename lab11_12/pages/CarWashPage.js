const { By, until } = require('selenium-webdriver');
const Page = require('../Page');

class CarWashPage extends Page {
    constructor(driver) {
        super(driver);
        this.carWashLink = By.xpath('//span[contains(text(), "Мойка легковых авто")]');
        this.pageHeader = By.xpath('//h1[contains(text(), "Мойка легковых авто")]');
    }

    async clickCarWashLink() {
        const element = await this.driver.wait(until.elementLocated(this.carWashLink), 10000);
        await element.click();
    }

    async verifyPageLoaded() {
        const element = await this.driver.wait(until.elementLocated(this.pageHeader), 10000);
        return await element.isDisplayed();
    }
}

module.exports = CarWashPage;
