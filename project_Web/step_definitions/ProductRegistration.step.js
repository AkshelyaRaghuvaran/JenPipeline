const { Given, When, Then } = require('@cucumber/cucumber');
const { LoginPage } = require('../pageobjects/Pages/LoginPage.js');
const { HomePage } = require('../pageobjects/Pages/HomePage.js');
const { RegistrationPage } = require('../pageobjects/Pages/RegistrationPage');
const { Product360Page } = require('../pageobjects/Pages/Product360Page');
const { register } = require('module');
const { setDefaultTimeout } = require('@cucumber/cucumber');
setDefaultTimeout(60 * 1000);
// const {
//     ProductRegistration,
//   } = require('../pageobjects/Pages/RegistrationPage.js');

const loginPage = new LoginPage();
const homePage = new HomePage();
const registrationPage = new RegistrationPage();
const product360Page = new Product360Page();

Then(
  'Click on Registration SmartBlox from Home panel menu',
  { timeout: 60 * 1000 },
  async function () {
    await homePage.getSmartBloxModules();
    //await homePage.selectModule('Registration');
    await registrationPage.selectModule();
  },
);

Then(
  'User should be landing on Product Registration Home page',
  { timeout: 40 * 1000 },
  async function () {
    await registrationPage.newProductRegistrationPage();
  },
);

Then('Click on new', { timeout: 50 * 1000 }, async function () {
  await registrationPage.clickNew();
});

Then(
  'Update the registration tab with {string}',
  { timeout: 60 * 1000 },
  async function (ali) {
    await registrationPage.registrationTab(ali);
  },
);

Then(
  'Update the Customer  tab with {string}',
  { timeout: 60 * 1000 },
  async function (customer) {
    await registrationPage.customerDelivery();
    await registrationPage.customerTab(customer);
  },
);

Then('Update the warranty tab', { timeout: 60 * 1000 }, async function () {
  //await registrationPage.warrantyTab();
});

Then('Click on save and register', { timeout: 60 * 1000 }, async function () {
  // Write code here that turns the phrase above into concrete actions
  await registrationPage.saveAndRegister();
});

// E2E Product Registration
Then('Click on Products SmartBlox from Home panel menu', async function () {
  await product360Page.selectModule();
});
Then('Open Product360', async function () {
  await product360Page.openProduct360();      
});
Then('Enter  unregistered ALI and Style Number with {string} and {string}', async function (ali, styleNumber) {
  await product360Page.fillProduct360Details(ali,styleNumber);
  
});
Then('Click on search', async function () {
  await product360Page.clickSearch();
  
});
Then('Select product registeration under create drop down',async function () {
  await product360Page.selectProductRegistration();
  
});
Then('Click on reject under more dropdown', async function () {
  await registrationPage.reject();
  
});
Then('Click on Reopen under more dropdown', async function () {
  await registrationPage.reOpen();
  
});