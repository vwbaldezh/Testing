const { By, until } = require('selenium-webdriver');
const Page = require('../Page');

class AutoGoodsPage extends Page {
    constructor(driver) {
        super(driver);
        this.driver = driver;
        this.advertisementsLink = By.xpath('//span[contains(text(), "Объявления")]');
        this.autoGoodsLink = By.xpath('//span[@class="nav__dropdown-text" and contains(text(), "Автотовары и расходники")]');
        this.pageHeader = By.xpath('//span[contains(@class, "catalog__title") and contains(text(), "Автоаксессуары")]');
    }

    async open() {
        await this.driver.get('https://av.by/');
    }

    async hoverOverAdvertisements() {
        const element = await this.driver.wait(until.elementLocated(this.advertisementsLink), 10000);
        const actions = this.driver.actions({ async: true });
        await actions.move({ origin: element }).perform();
    }

    async clickAutoGoodsLink() {
        await this.hoverOverAdvertisements();  
        const element = await this.driver.wait(until.elementLocated(this.autoGoodsLink), 10000);
        await this.driver.wait(until.elementIsVisible(element), 20000);
        await element.click();
    }

    async verifyPageLoaded() {
        const element = await this.driver.wait(until.elementLocated(this.pageHeader), 20000);
        return await element.isDisplayed();
    }
}

module.exports = AutoGoodsPage;
