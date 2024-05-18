const { Builder } = require('selenium-webdriver');
const LoginPage = require('../pages/LoginPage');
const ProfilePage = require('../pages/SettingsPage');
const MyAdsPage = require('../pages/MyAdsPage');

describe('Profile Settings Test', () => {
    let driver;
    let loginPage;
    let profilePage;
    let myAdsPage;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        loginPage = new LoginPage(driver);
        profilePage = new ProfilePage(driver);
        myAdsPage = new MyAdsPage(driver);
    }, 30000);

    afterAll(async () => {
        await driver.quit();
    }, 30000);

    test('Should update profile name and display notification', async () => {
        jest.setTimeout(30000);
        await loginPage.open();
        await loginPage.login('292761812', 'kirill29029');

        const isLoggedIn = await loginPage.verifyLogin();
        expect(isLoggedIn).toBe(true);

        await myAdsPage.clickProfileIcon();
        await myAdsPage.clickMyAdsLink();

        const isMyAdsPageLoaded = await myAdsPage.verifyPageLoaded();
        expect(isMyAdsPageLoaded).toBe(true);

        await profilePage.clickSettingsLink();

        await profilePage.enterNewName('Новое Имя');
        await profilePage.clickSaveButton();

        const isNotificationDisplayed = await profilePage.verifyNotification();
        expect(isNotificationDisplayed).toBe(true);
    }, 30000); 
});
