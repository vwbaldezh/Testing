const { Builder, By, until } = require('selenium-webdriver');
const ServicesPage = require('../pages/ServicesPage');
const CarWashPage = require('../pages/CarWashPage');

describe('Car Wash Services Test', () => {
    let driver;
    let servicesPage;
    let carWashPage;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        servicesPage = new ServicesPage(driver);
        carWashPage = new CarWashPage(driver);
    }, 30000);

    afterAll(async () => {
        await driver.quit();
    }, 30000);

    test('Should navigate to car wash services for passenger cars', async () => {
        await servicesPage.open('https://av.by/');

        await servicesPage.clickServicesMenu();
        await driver.wait(until.urlContains('https://av.by/company'), 10000);

        await servicesPage.clickCarWashOption();
        await driver.wait(until.urlContains('https://av.by/company/avtomoyki'), 10000);

        await carWashPage.clickCarWashLink();
        const isPageLoaded = await carWashPage.verifyPageLoaded();
        expect(isPageLoaded).toBe(true);
    }, 30000);
});
