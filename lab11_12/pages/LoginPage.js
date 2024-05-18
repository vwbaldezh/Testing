const { By, until } = require('selenium-webdriver');
const Page = require('../Page');

class LoginPage extends Page {
    constructor(driver) {
        super(driver);
        this.driver = driver;
        this.loginButton = By.xpath('//span[contains(@class, "nav__link-text") and text()="Войти"]');
        this.telephoneInput = By.id('authPhone');
        this.passwordInput = By.id('passwordPhone');
        this.submitButton = By.xpath('//button[@type="submit"]');
        this.accountIcon = By.xpath('//a[@href="https://av.by/profile/offers"]');
    }

    async open() {
        await this.driver.get('https://av.by/');
    }

    async enterTelephone(telephone) {
        const element = await this.driver.wait(until.elementLocated(this.telephoneInput), 10000);
        await element.sendKeys(telephone);
    }

    async enterPassword(password) {
        const element = await this.driver.wait(until.elementLocated(this.passwordInput), 10000);
        await element.sendKeys(password);
    }

    async clickLoginButton() {
        const element = await this.driver.wait(until.elementLocated(this.loginButton), 10000);
        await element.click();
    }    
    
    async clickSubmitButton() {
        const element = await this.driver.wait(until.elementLocated(this.submitButton), 10000);
        await element.click();
    }

    async login(telephone, password) {
        await this.clickLoginButton();
        await this.enterTelephone(telephone);
        await this.enterPassword(password);
        await this.clickSubmitButton();
    }

    async verifyLogin() {
        const element = await this.driver.wait(until.elementLocated(this.accountIcon), 10000);
        return await element.isDisplayed();
    }
}

module.exports = LoginPage;
