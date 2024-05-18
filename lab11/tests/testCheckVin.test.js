const BrowserManager = require('../BrowserManager');
const AvByPage = require('../pages/CheckVinPage');
const { until } = require('selenium-webdriver');

describe('Check Vehicle By VIN Test', () => {
    let browser;

    beforeAll(() => {
        browser = new BrowserManager();
    });

    afterAll(async () => {
        await browser.quit();
    });

    test('Should navigate to page with vehicle history report by VIN', async () => {
        const page = new AvByPage(browser.driver);
        try {
            await page.open('https://av.by');
            await browser.driver.sleep(3000);

            await page.clickNavLink();
            await browser.driver.wait(until.urlIs('https://av.by/vin'), 10000);

            await page.enterVin('WV2ZZZ7HZKH002143');
            await page.clickCheckButton();

            await browser.driver.wait(until.urlContains('/WV2ZZZ7HZKH002143?prereport'), 10000);

            const pageTitleText = await page.getPageTitleText();
            expect(pageTitleText).toContain('Отчёт об истории транспорта с VIN WV2ZZZ7HZKH002143');
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }, 30000); 
});
