const { Builder, By, until } = require('selenium-webdriver');
const assert = require('chai').assert;

async function viewCarWashServicesTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Шаг 1: Открытие главной страницы сайта
        await driver.get('https://av.by'); // Замените "example.com" на адрес нужного сайта

        // Шаг 2: Клик по элементу "Услуги" 
        const addToCartButton = await driver.wait(until.elementLocated(By.xpath('//span[text()="Услуги"]')), 10000);
        await addToCartButton.click();

        // Ожидание открытия страницы с предоставляемыми услугами для авто
        await driver.wait(until.urlIs('https://av.by/company'), 10000); // Замените URL на ожидаемый адрес страницы с услугами

        // Шаг 3: Выбор пункта "Автомойки" 
        const carwashlink = await driver.wait(until.elementLocated(By.css('.companies-category__link[href*="/company/avtomoyki"]')), 10000);
        await carwashlink.click();

        // Ожидание открытия страницы для выбора автомойки для конкретного авто
        await driver.wait(until.urlIs('https://av.by/company/avtomoyki'), 3000); // Замените URL на ожидаемый адрес страницы с автомойками

        // Шаг 4: Выбор пункта "Мойка легковых авто" 
        const carwashforcarslink = await driver.wait(until.elementLocated(By.xpath('//span[text()="Мойка легковых авто"]')), 10000);
        await carwashforcarslink.click();

        // Ожидание загрузки страницы с компаниями, специализирующимися на мойке легковых авто
        await driver.wait(until.urlIs('https://av.by/company/avtomoyki_moyka-legkovyh-avto'), 3000); // Замените URL на ожидаемый адрес страницы с мойками для легковых авто

        // Проверка успешной загрузки страницы
        const pageTitle = await driver.findElement(By.css('h1.heading__text'));
        const pageTitleText = await pageTitle.getText();
        assert.strictEqual(pageTitleText, 'Мойка легковых авто', 'Page title should be "Мойка легковых авто"');


    } finally {
        await driver.quit();
    }
}

async function checkVehicleByVinTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('https://av.by'); // Замените "example.com" на адрес нужного сайта

        // Шаг 2: Клик по элементу "Услуги" 
        const addToCartButton = await driver.wait(until.elementLocated(By.xpath('//a[@class="nav__link" and @title="Проверка VIN"]/span[@class="nav__link-text"]')), 10000);
        await addToCartButton.click();

        // Ожидание перехода на страницу с вводом VIN-номера
        await driver.wait(until.urlIs('https://av.by/vin'), 10000); // Замените URL на ожидаемый адрес страницы с вводом VIN-номера

        // Шаг 3: Ввод интересующего VIN-номера и нажатие на кнопку "Проверить VIN"
        const vinInput = await driver.wait(until.elementLocated(By.css('.form-control.form-control--large')), 10000);
        await vinInput.sendKeys('WV2ZZZ7HZKH002143');

        const checkButton = await driver.wait(until.elementLocated(By.xpath('//button[contains(@class, "button--primary") and .//span[text()="Проверить VIN"]]')), 10000);
        await checkButton.click();

        // Ожидание перехода на страницу с отчетом об истории транспорта
        await driver.wait(until.urlContains('/WV2ZZZ7HZKH002143?prereport'), 10000); // Замените URL на ожидаемый адрес страницы с отчетом об истории транспорта

        // Проверка успешного перехода на страницу с отчетом об истории транспорта
        const pageTitle = await driver.findElement(By.css('h1'));
        const pageTitleText = await pageTitle.getText();
        assert.include(pageTitleText, 'Отчёт об истории транспорта с VIN WV2ZZZ7HZKH002143', 'Page title should contain "Vehicle History Report"');

    } finally {
        await driver.quit();
    }
}

// Запуск тестов
describe('View Car Wash Services Test', function() {
    this.timeout(30000);

    it('Should open page with car wash services', async () => {
        await viewCarWashServicesTest();
    });
});

describe('Check Vehicle By VIN Test', function() {
    this.timeout(30000);

    it('Should navigate to page with vehicle history report by VIN', async () => {
        await checkVehicleByVinTest();
    });
});