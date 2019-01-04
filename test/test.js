const puppeteer = require('puppeteer');
const { expect } = require('chai');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:8080/test');
})();
