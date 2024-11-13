const { Given, When, Then } = require('@cucumber/cucumber');
const { setDefaultTimeout } = require('@cucumber/cucumber');
const { LoginPage } = require('../pageobjects/Pages/LoginPage.js');
const { HomePage } = require('../pageobjects/Pages/HomePage.js');
const { Customer360Page } = require('../pageobjects/Pages/Customer360Page.js');
const {
  SupportRequestPage,
} = require('../pageobjects/Pages/SupportRequestPage.js');

setDefaultTimeout(60 * 1000);

const loginPage = new LoginPage();
const homePage = new HomePage();
const customer360 = new Customer360Page();
const supportRequest = new SupportRequestPage();

Given('User is on the login page', async function () {
  await loginPage.goTo();
});
When('Login with {string} and {string}', async function (userName, passWord) {
  await loginPage.validLogin(userName, passWord);
});

Then('Search for a customer with {string}', async function (searchText) {
  await homePage.startSearching(searchText);
});

Then('Create a support request', async function () {
  await customer360.createSupportRequest();
});

Then('Update the request tab of support request', async function () {
  await supportRequest.requestTab();
});

Then('Update the products tab with necessary details', async function () {
  await supportRequest.productTab();
});

Then('Update visits tab with necessary details', async function () {
  await supportRequest.visitTab();
});

Then('Update the labor tab with necessary details', async function () {
  await supportRequest.laborTab();
  await supportRequest.adjustlaborTab();
});

Then(
  'Save the support request and capture the ID and status',
  async function () {
    await supportRequest.saveSupportRequest();
  },
);

Then('Submit the Support Request and capture the status', async function () {
  await supportRequest.submitSupportRequest();
});

Then('Add a Part in Parts with {string} section and Check the order Checkbox', async function (part) {
  await supportRequest.partsTab(part);
  
});

Then('Place the Part Order', async function () {
  await supportRequest.placePartOrder();
  
});

Then('Verify the Summary Tab', async function () {
  await supportRequest.summaryTab();
  
});

Then('Select Customer Pay', async function () {
  await supportRequest.selectCustomerPay();
});
Then('Verify the Customer Pay Tab', async function () {
  await supportRequest.validatePaymentPage();
});
Then('Get the Payment Link', async function () {
  await supportRequest.getPaymentLink();
});
Then('Proceed with the Payment', async function () {
  await supportRequest.openPaymentLink();
  await supportRequest.makePayment();
});
Then('Resolve visits', async function () {
  await supportRequest.resolveVisit();
});
Then('Resolve Service Request', async function () {
  await supportRequest.resolveServiceRequest();
});

Then('Resolve the Support Request and Verify the Status', async function () {
  await supportRequest.resolveSupportRequest();
});

