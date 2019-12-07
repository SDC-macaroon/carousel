/* eslint-disable no-unused-vars */
const react = require('react');
const enzyme = require('enzyme');
const puppeteer = require('puppeteer');

const pageUrl = 'http//localhost:3001/morestyles/2001';
let page;
let browser;
const width = 1920;
const height = 1080;

const beforeAll = (async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: [`--window-size=${width},${height}`],
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
});

const afterAll = (() => {
  browser.close();
});

describe('test whether jest installed correctly', () => {
  test('jest "test" with no test defined passes by default', () => {

  });
});
