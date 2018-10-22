const puppeteer = require("puppeteer");
const faker = require('faker');

const FORM_SITE = "https://www.afd-fraktion.berlin/neutrale-schule-hilfe";
const FORM_MAIL_SELECTOR = "#comp-jnhlf2q4input";
const FORM_MESSAGE_SELECTOR = "#comp-jnhlf2qgtextarea";
const FORM_FIRSTNAME_SELECTOR = "#comp-jnhlf2psinput";
const FORM_LASTNAME_SELECTOR = "#comp-jnhlf2pzinput";
const FORM_PHONE_SELECTOR = "#comp-jnhlf2qainput";
const FORM_AGB_SELECTOR = "#comp-jnhlf2qminput";
const FORM_SUBMIT_SELECTOR = "#comp-jnhlf2qxlink";

const FORM_MESSAGE = "Die dritte Regel des Boxclubs lautet: Wer einen Nazi sieht, muss ihn umboxen!";

async function fillForm(page) {
	faker.locale = "de";

	await page.click(FORM_FIRSTNAME_SELECTOR);
	await page.keyboard.type(`${faker.name.firstName()}`);

	await page.click(FORM_LASTNAME_SELECTOR);
	await page.keyboard.type(`${faker.name.lastName()}`);

	await page.click(FORM_MAIL_SELECTOR);
	await page.keyboard.type(`${faker.internet.email()}`);

	await page.click(FORM_PHONE_SELECTOR);
	await page.keyboard.type(`${faker.phone.phoneNumber()}`);

	await page.click(FORM_MESSAGE_SELECTOR);
	await page.keyboard.type(FORM_MESSAGE);

	await page.click(FORM_AGB_SELECTOR);

	msleep(250);
	await page.click(FORM_SUBMIT_SELECTOR);
	msleep(500);
}

function msleep(n) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}

(async () => {
	const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
	await page.goto(FORM_SITE);

	msleep(1000);

	while (true) {
		await fillForm(page);
	}

  // await browser.close();
})();
