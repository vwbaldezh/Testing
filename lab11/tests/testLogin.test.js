const { Builder, until } = require('selenium-webdriver');
const LoginPage = require('../pages/LoginPage');

describe('Login Test', () => {
    let driver;
    let page;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        page = new LoginPage(driver);
    }, 30000);

    afterAll(async () => {
        await driver.quit();
    }, 30000); 
    
    test('Should login to av.by account', async () => {
        await page.open();
        await page.login('292761812', 'kirill29029'); 

        await driver.wait(until.urlIs('https://av.by/'), 30000);
    }, 30000);
});
