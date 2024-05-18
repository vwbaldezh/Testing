const { By, until } = require('selenium-webdriver');

class AvByPage {
    constructor(driver) {
        this.driver = driver;
        this.servicesLink = By.xpath('//span[text()="Услуги"]');
        this.carwashLink = By.css('.companies-category__link[href*="/company/avtomoyki"]');
        this.carwashForCarsLink = By.xpath('//span[text()="Мойка легковых авто"]');
        this.pageTitle = By.css('h1.heading__text');
    }

    async open() {
        await this.driver.get('https://av.by');
    }

    async clickServicesLink() {
        const element = await this.driver.wait(until.elementLocated(this.servicesLink), 10000);
        await element.click();
    }

    async clickCarwashLink() {
        const element = await this.driver.wait(until.elementLocated(this.carwashLink), 10000);
        await element.click();
    }

    async clickCarwashForCarsLink() {
        const element = await this.driver.wait(until.elementLocated(this.carwashForCarsLink), 10000);
        await element.click();
    }

    async getPageTitleText() {
        const element = await this.driver.findElement(this.pageTitle);
        return await element.getText();
    }
}

module.exports = AvByPage;
