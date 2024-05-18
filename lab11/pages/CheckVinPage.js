const { By } = require('selenium-webdriver');
const Page = require('../Page');

class AvByPage extends Page {
    constructor(driver) {
        super(driver);
        this.navLink = By.xpath('//a[@class="nav__link" and @title="Проверка VIN"]/span[@class="nav__link-text"]');
        this.vinInput = By.css('.form-control');
        this.checkButton = By.xpath('//button[contains(@class, "button--primary") and .//span[text()="Проверить VIN"]]');
        this.pageTitle = By.css('h1');
    }

    async clickNavLink() {
        const element = await this.waitForElement(this.navLink);
        await this.click(element);
    }

    async enterVin(vin) {
        const element = await this.waitForElement(this.vinInput);
        await this.sendKeys(element, vin);
    }

    async clickCheckButton() {
        const element = await this.waitForElement(this.checkButton);
        await this.click(element);
    }

    async getPageTitleText() {
        const element = await this.findElement(this.pageTitle);
        return await element.getText();
    }
}

module.exports = AvByPage;
