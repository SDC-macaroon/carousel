/* eslint-disable no-unused-vars */
const react = require('react');
const enzyme = require('enzyme');
const puppeteer = require('puppeteer');

const pageUrl = 'http://localhost:3001/morestyles/';
let page;
let browser;
const width = 1080;
const height = 720;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: [`--window-size=${width},${height}`],
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
});

afterAll(() => {
  browser.close();
});

describe('/morestyles/ queries return correct responses', () => {
  test('query of invalid productId returns error', async () => {
    await page.goto(`${pageUrl}190`);
    const response = await page.$eval('pre', (e) => e.textContent);
    expect(response).toBe('a problem occured with the request');
  });

  test('query of productId 2001 returns array of styles begining with productId 2002', async () => {
    await page.goto(`${pageUrl}2001`);
    const response = await page.$eval('pre', (e) => e.textContent);
    expect(Array.isArray(JSON.parse(response))).toBe(true);
    expect(JSON.parse(response)[0].productId).toBe(2002);
  });
});
