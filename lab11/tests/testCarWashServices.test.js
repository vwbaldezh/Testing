const { Builder, By, until } = require('selenium-webdriver');
const CarWashServicesPage = require('../pages/CarWashServicesPage');

describe('View Car Wash Services Test', () => {
    let driver;
    let page;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        page = new CarWashServicesPage(driver);
    }, 30000);

    afterAll(async () => {
        await driver.quit();
    }, 60000);

    test('Should open page with car wash services', async () => {
        await page.open();
        await page.clickServicesLink();
        await driver.wait(until.urlContains('/company'), 10000);

        await page.clickCarwashLink();
        await driver.wait(until.urlContains('/company/avtomoyki'), 10000);

        await page.clickCarwashForCarsLink();
        await driver.wait(until.urlContains('/company/avtomoyki_moyka-legkovyh-avto'), 10000);

        const pageTitleText = await page.getPageTitleText();
        console.log('Page Title Text:', pageTitleText);
        expect(pageTitleText).toBe('Мойка легковых авто');
    }, 60000);
});
