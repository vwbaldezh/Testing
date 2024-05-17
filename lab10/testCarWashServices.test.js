const { Builder, By, until } = require('selenium-webdriver');

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

describe('View Car Wash Services Test', () => {
    let driver;
    let page;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        page = new AvByPage(driver);
    }, 30000);

    afterAll(async () => {
        await driver.quit();
    }, 30000);

    test('Should open page with car wash services', async () => {
        await page.open();
        await page.clickServicesLink();
        await driver.wait(until.urlIs('https://av.by/company'), 10000);

        await page.clickCarwashLink();
        await driver.wait(until.urlIs('https://av.by/company/avtomoyki'), 10000);

        await page.clickCarwashForCarsLink();
        await driver.wait(until.urlIs('https://av.by/company/avtomoyki_moyka-legkovyh-avto'), 10000);

        const pageTitleText = await page.getPageTitleText();
        expect(pageTitleText).toBe('Мойка легковых авто');
    }, 30000);
});
