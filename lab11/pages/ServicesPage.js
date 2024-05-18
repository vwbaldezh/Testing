const { By, until } = require('selenium-webdriver');
const Page = require('../Page');

class ServicesPage extends Page {
    constructor(driver) {
        super(driver);
        this.servicesMenu = By.xpath('//span[contains(text(), "Услуги")]');
        this.carWashOption = By.xpath('//a[@class="companies-category__link" and contains(text(), "Автомойки")]');
    }

    async clickServicesMenu() {
        const element = await this.driver.wait(until.elementLocated(this.servicesMenu), 10000);
        await element.click();
    }

    async clickCarWashOption() {
        const element = await this.driver.wait(until.elementLocated(this.carWashOption), 10000);
        await element.click();
    }
}

module.exports = ServicesPage;
