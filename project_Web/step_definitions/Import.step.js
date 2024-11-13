const { Given, When, Then } = require('@cucumber/cucumber');
const { setDefaultTimeout } = require('@cucumber/cucumber');
const { HomePage } = require('../pageobjects/Pages/HomePage.js');
const { CXConnectPage } = require('../pageobjects/Pages/CXConnectPage.js');
const { ImportPage } = require('../pageobjects/Pages/ImportPage.js');
const { CommonUtils } = require('../../Utils/common-util.js');

setDefaultTimeout(60 * 1000);

const homePage = new HomePage();
const cxconnect = new CXConnectPage();
const importPage = new ImportPage();
const commonUtils = new CommonUtils();
const filePath = 'project_Web/Files-to-upload/TestImport.csv';

Then('Select Go To menu', async function () {
  await homePage.selectGoToMenu();
});

Then('Navigate to the CX Connect', async function () {
  await homePage.selectCXModule();
});

Then(
  'Select Import option from ImportExport menu',
  { timeout: 60 * 1000 },
  async function () {
    await cxconnect.selectActioninCXConnect();
  },
);

Then('Get the latest Import ID', async function () {
  await importPage.getLatestImportID();
});

Then('Select New to import the data', async function () {
  await importPage.goToImport();
  await importPage.selectNewImport();
});

Then('Fill in the details in Import Tab', async function () {
  await importPage.importTab_fillDetails();
});

Then('Browse and upload the file', async function () {
  await importPage.importTab_uploadFile(filePath);
});

Then('Import the file', async function () {
  await importPage.importTab_importFile();
});

Then('Validate that Import is successful', async function () {
  await importPage.importTab_validateImport();
});

Then('View the logs', async function () {
  await importPage.importTab_viewLogs();
});

Then('User should should select the desired Import log', async function () {
  await importPage.refreshPage();
  await importPage.selectImportLog();
});

Then('Verify the details in the Import Log', async function () {
  await importPage.verifyImportLog();
  await importPage.verifyRecords();
});

Then('Navigate to Record Data Tab', async function () {
  await importPage.goToRecordDataTab();
});

Then(
  'Select the Entity and Verify the details of the import',
  async function () {
    await importPage.selectAndVerifyEntity();
  },
);
