const { By, until } = require('selenium-webdriver');

class Page {
    constructor(driver) {
        this.driver = driver;
    }

    async open(url) {
        await this.driver.get(url);
    }

    async findElement(locator) {
        return await this.driver.findElement(locator);
    }

    async findElements(locator) {
        return await this.driver.findElements(locator);
    }

    async click(element) {
        await element.click();
    }

    async sendKeys(element, keys) {
        await element.sendKeys(keys);
    }

    async waitForElement(locator, timeout = 10000) {
        await this.driver.wait(until.elementLocated(locator), timeout);
        return await this.findElement(locator);
    }

    async executeScript(script, ...args) {
        return await this.driver.executeScript(script, ...args);
    }
}

module.exports = Page;
