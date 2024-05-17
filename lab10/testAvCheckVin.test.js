const { Builder, By, until } = require('selenium-webdriver');

class AvByPage {
    constructor(driver) {
        this.driver = driver;
        this.navLink = By.xpath('//a[@class="nav__link" and @title="Проверка VIN"]/span[@class="nav__link-text"]');
        this.vinInput = By.css('.form-control');
        this.checkButton = By.xpath('//button[contains(@class, "button--primary") and .//span[text()="Проверить VIN"]]');
        this.pageTitle = By.css('h1');
    }

    async open() {
        await this.driver.get('https://av.by');
    }

    async clickNavLink() {
        const element = await this.driver.wait(until.elementLocated(this.navLink), 10000);
        await element.click();
    }

    async enterVin(vin) {
        const element = await this.driver.wait(until.elementLocated(this.vinInput), 10000);
        await element.sendKeys(vin);
    }

    async clickCheckButton() {
        const element = await this.driver.wait(until.elementLocated(this.checkButton), 10000);
        await element.click();
    }

    async getPageTitleText() {
        const element = await this.driver.findElement(this.pageTitle);
        return await element.getText();
    }
}

describe('Check Vehicle By VIN Test', () => {
    let driver;
    let page;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        page = new AvByPage(driver);
    }, 30000);

    afterAll(async () => {
        await driver.quit();
    }, 30000);

    test('Should navigate to page with vehicle history report by VIN', async () => {
        await page.open();
        await page.clickNavLink();
        await driver.wait(until.urlIs('https://av.by/vin'), 10000);

        await page.enterVin('WV2ZZZ7HZKH002143');
        await page.clickCheckButton();

        await driver.wait(until.urlContains('/WV2ZZZ7HZKH002143?prereport'), 10000);

        const pageTitleText = await page.getPageTitleText();
        expect(pageTitleText).toContain('Отчёт об истории транспорта с VIN WV2ZZZ7HZKH002143');
    }, 30000);
});
