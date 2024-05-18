const { Builder, By, until } = require('selenium-webdriver');
const AdvertisementsPage = require('../pages/AdvertisementsPage');

describe('Advertisements Test', () => {
    let driver;
    let page;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        page = new AdvertisementsPage(driver);
    }, 30000);

    afterAll(async () => {
        await driver.quit();
    }, 30000);

    test('Should navigate to advertisement page and verify title', async () => {
        await page.open();
        await page.clickAdvertisementLink();

        await driver.wait(until.urlContains('cars.av.by'), 10000);

        const pageTitleElement = await driver.findElement(By.tagName('h1'));
        const pageTitleText = await pageTitleElement.getText();
        expect(pageTitleText).toContain('Продажа');
    }, 30000);
});
