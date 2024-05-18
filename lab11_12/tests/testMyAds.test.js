const { Builder, until } = require('selenium-webdriver'); 
const LoginPage = require('../pages/LoginPage');
const MyAdsPage = require('../pages/MyAdsPage');

describe('Login and Navigate to My Ads Test', () => {
    let driver;
    let loginPage;
    let myAdsPage;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        loginPage = new LoginPage(driver);
        myAdsPage = new MyAdsPage(driver);
    }, 30000);

    afterAll(async () => {
        await driver.quit();
    }, 30000);

    test('Should login and navigate to user\'s ads page', async () => {
        await loginPage.open('https://av.by/');
        await loginPage.login('292761812', 'kirill29029');

        const isLoggedIn = await loginPage.verifyLogin();
        expect(isLoggedIn).toBe(true);
        
        await driver.wait(until.urlIs('https://av.by/'), 10000);

        await myAdsPage.clickProfileIcon();

        await myAdsPage.clickMyAdsLink();
        const isPageLoaded = await myAdsPage.verifyPageLoaded();
        expect(isPageLoaded).toBe(true);
    }, 30000);
});
