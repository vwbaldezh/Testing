const { Builder } = require('selenium-webdriver');
const AutoGoodsPage = require('../pages/AutoGoodsPage');

describe('AutoGoods Test', () => {
    let driver;
    let page;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        page = new AutoGoodsPage(driver);
    }, 30000);

    afterAll(async () => {
        await driver.quit();
    }, 30000);

    test('Should navigate to auto goods and consumables page', async () => {
        await page.open();
        await page.clickAutoGoodsLink();

        const isPageLoaded = await page.verifyPageLoaded();
        expect(isPageLoaded).toBe(true);
    }, 30000);
});
