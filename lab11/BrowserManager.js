const { Builder, By, Key, until } = require('selenium-webdriver');
const Logger = require('./Logger');

class BrowserManager {
    constructor() {
        this.driver = new Builder().forBrowser('chrome').build();
    }

    async quit() {
        await this.driver.quit();
    }

    async sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    async open(url) {
        Logger.log('Открытие страницы:', url);
        await this.driver.get(url);
    }

    async findElement(locator) {
        Logger.log('Поиск элемента:', locator);
        return await this.driver.findElement(locator);
    }

    async findElements(locator) {
        Logger.log('Поиск элементов:', locator);
        return await this.driver.findElements(locator);
    }

    async click(element) {
        Logger.log('Клик по элементу:', element);
        await element.click();
    }

    async sendKeys(element, keys) {
        Logger.log('Ввод текста:', keys);
        await element.sendKeys(keys);
    }

    async waitForElement(locator, timeout) {
        Logger.log('Ожидание элемента:', locator);
        await this.driver.wait(until.elementLocated(locator), timeout);
    }

    async executeScript(script, ...args) {
        return await this.driver.executeScript(script, ...args);
    }
}

module.exports = BrowserManager;