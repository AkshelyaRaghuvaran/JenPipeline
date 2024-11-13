const playwright = require('@playwright/test');
const { request } = require('@playwright/test');
require('dotenv').config();

// setDefaultTimeout(60 * 1000);

const {
  BeforeAll,
  Before,
  After,
  AfterStep,
  BeforeStep,
  Status,
  AfterAll,
} = require('@cucumber/cucumber');
const { afterEach } = require('node:test');

Before({ timeout: 1000 * 1000 }, async () => {
  let browserType = process.env.browser;

  switch (browserType) {
    case 'chromium':
    case 'chrome':
      global.browser = await playwright.chromium.launch({
        headless: true,
        viewport: null, // This will use the full screen size
      });
      break;
    //case 'firefox':
    //   global.browser = await playwright.firefox.launch({
    //     headless: true,
    //     viewport: null, // This will use the full screen size
    //   });
    //   break;
    // case 'webkit':
    //   global.browser = await playwright.webkit.launch({
    //     headless: true,
    //     viewport: null, // This will use the full screen size
    //   });
    //   break;
    // case 'msedge':
    // case 'edge':
    //   global.browser = await playwright.chromium.launch({
    //     headless: true,
    //     channel: 'msedge',
    //     viewport: null, // This will use the full screen size
    //   });
    //   break;
    default:
      global.browser = await playwright.chromium.launch({
        headless: true,
        viewport: null, // This will use the full screen size
      });
  }

  global.browser = browser;
  global.context = await browser.newContext();
  global.page = await context.newPage();
  // global.page = page;
});

// Before({ timeout: 60 * 1000 }, async function () {});

BeforeStep({ timeout: 60 * 1000 }, async function () {
  page.setDefaultTimeout(60000);
});

AfterStep(async function ({ result }) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === Status.FAILED) {
    const screenshot = await global.page.screenshot({
      path: './screenshots/screenshot.png',
    });
    this.attach(screenshot, 'image/png');
  }
});

AfterStep(async function ({ result }) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === Status.FAILED) {
    const screenshotPath = path.resolve(`./screenshots/screenshot-${Date.now()}.png`);
    const screenshot = await global.page.screenshot({ path: screenshotPath });

    // Read the screenshot file and attach it to the report
    const screenshotData = fs.readFileSync(screenshotPath);
    await this.attach(screenshotData, 'image/png');
  }
});
After({ timeout: 60 * 1000 }, async function () {
  // console.log('Closing page and context...');
  if (global.page && !global.page.isClosed()) {
    await global.page.close();
  }
  if (global.context) {
    await global.context.close();
  }
  console.log('Page and context closed.');
});

AfterAll(async function () {
  // console.log('Closing browser...');
  if (global.browser) {
    await global.browser.close();
  }
  // console.log('Browser closed.');
});
