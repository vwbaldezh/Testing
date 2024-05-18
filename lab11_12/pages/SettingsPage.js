const { By, until } = require('selenium-webdriver');
const Page = require('../Page');

class ProfilePage extends Page {
    constructor(driver) {
        super(driver);
        this.settingsLink = By.xpath('//a[contains(@class, "sidenav__link") and contains(@href, "/profile/settings")]');
        this.nameInput = By.id('name');
        this.saveButton = By.xpath('//button[@type="submit"]');
        this.notification = By.xpath('//div[contains(text(), "Настройки сохранены")]');
    }

    async clickSettingsLink() {
        const element = await this.driver.wait(until.elementLocated(this.settingsLink), 10000);
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", element);
        await this.driver.wait(until.elementIsVisible(element), 10000); 
        await element.click();
    }

    async enterNewName(name) {
        const element = await this.driver.wait(until.elementLocated(this.nameInput), 10000);
        await this.driver.wait(until.elementIsVisible(element), 10000); 
        await element.clear();
        await element.sendKeys(name);
    }

    async clickSaveButton() {
        const element = await this.driver.wait(until.elementLocated(this.saveButton), 10000);
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", element); 
        await element.click();
    }

    async verifyNotification() {
        const element = await this.driver.wait(until.elementLocated(this.notification), 10000);
        await this.driver.wait(until.elementIsVisible(element), 10000); 
        return await element.isDisplayed();
    }
}

module.exports = ProfilePage;
