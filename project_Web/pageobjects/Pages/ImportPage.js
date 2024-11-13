const { test, expect } = require('@playwright/test');
const { v4: uuidv4 } = require('uuid');
const { ReportLog } = require('../../../Utils/report-util');
const el = require('../elements/elements');
const { CommonUtils } = require('../../../Utils/common-util');
const td = require('../data-files/test-data');
const exp = require('constants');
const { parse } = require('node:path/win32');

const commonUtils = new CommonUtils();
const objReportLog = new ReportLog();
let ImportName;
let screenshotCounter = 0;
let totalRecords;
let latestImportID;
class ImportPage {
  /**
   * @author: Srijanani
   * @Function_Name : getLatestImportID
   * @Description : This Function gets the latest Import ID and clicks on Import option
   * @Params : none
   * @returns : none
   */
  async getLatestImportID() {
    latestImportID = await page
      .locator(el.ImportPage.tableSearchResults)
      .nth(1)
      .innerText();
    console.log('Latest Import ID: ', latestImportID);
    await objReportLog.log('Latest Import ID: ' + latestImportID);
  }

  async goToImport() {
    // const buttonImport = await page.locator(el.ImportPage.ImportPage).nth(1);
    // await buttonImport.click();
    console.log('Going to select Import Button');
    await page.locator(el.ImportPage.ImportPage).click();
    await page.waitForTimeout(5000);
  }

  /**
   * @author: Srijanani
   * @Function_Name : selectNewImport
   * @Description : This Function selects New Import and validates the status
   * @Params : none
   * @returns : none
   */

  async selectNewImport() {
    await page.locator(el.ImportPage.btnNew).click();
    await page.waitForTimeout(10000);
  }

  /**
   * @author: Srijanani
   * @Function_Name : importTab_fillDetails
   * @Description : This Function fills the details in Import Tab
   * @Params : none
   * @returns : none
   */

  async importTab_fillDetails() {
    const uniqueName = `Test Import ${uuidv4()}`;
    await page.locator(el.ImportPage.nameField).fill(uniqueName);
    await page
      .locator(el.ImportPage.DDentityType)
      .selectOption(td.TestDataImport.entityType);
    await page.waitForTimeout(5000);
    await page
      .locator(el.ImportPage.DDavailableMappings)
      .selectOption(td.TestDataImport.mappingType);
    await page.waitForTimeout(3000);
    await page
      .locator(el.ImportPage.importFormat)
      .selectOption(td.TestDataImport.importFormat);
    await page.waitForTimeout(3000);
    await page.locator(el.ImportPage.delimiter).selectOption(td.TestDataImport.delimiter);
    await page.waitForTimeout(3000);
    await page
      .locator(el.ImportPage.importSource)
      .selectOption(td.TestDataImport.importSource);
  }

  /**
   * @author: Srijanani
   * @Function_Name : importTab_uploadFile
   * @Description : This Function uploads the file in Import Tab
   * @Params : filePath
   * @returns : none
   */

  async importTab_uploadFile(filePath) {
    const fileUpload = await page.locator(el.ImportPage.btnBrowse);
    await fileUpload.setInputFiles(filePath);
    await objReportLog.log('File attached successfully');
    await page.waitForTimeout(25000);
  }

  /**
   * @author: Srijanani
   * @Function_Name : importTab_importFile
   * @Description : This Function click on Import option in Import Tab and confirms the import
   * @Params : none
   * @returns : none
   */

  async importTab_importFile() {
    await page.locator(el.ImportPage.btnImport).click();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(5000);
    await page.locator(el.ImportPage.importConfirmBox).nth(0).click();
    await page.waitForTimeout(10000);
  }

  /**
   * @author: Srijanani
   * @Function_Name : importTab_validateImport
   * @Description : This Function validates the import status and message
   * @Params : none
   * @returns : ImportName
   */

  async importTab_validateImport() {
    const ImportMessage = await page
      .locator(el.ImportPage.statusBar)
      .innerText();
    await page.waitForTimeout(5000);
    const strExpectedMessage = 'Saved Successfully';
    await page.waitForTimeout(5000);
    await commonUtils.compareActualAndExpectedText(
      ImportMessage,
      strExpectedMessage,
    );
    await objReportLog.log(ImportMessage);
    await page.screenshot({ path: `screenshots/Import.png` });
    await expect(page.locator(el.ImportPage.importStatus)).toHaveText(
      'Scheduled',
    );
    ImportName = await page.locator(el.ImportPage.nameField).textContent();
    await objReportLog.log(`Import Name: ${ImportName}`);
    console.log('Import Name: ', ImportName);
    return ImportName;
  }

  /**
   * @author: Srijanani
   * @Function_Name : importTab_viewLogs
   * @Description : This Function clicks on View Logs option in Import Tab
   * @Params : none
   * @returns : none
   */

  async importTab_viewLogs() {
    await page.waitForTimeout(10000);
    await page.locator('#formGroup').first().hover();
    await page.waitForTimeout(5000);
    await page.getByRole('link', { name: 'View Logs' }).click();
    await objReportLog.log('View Logs Clicked');
    await page.screenshot({ path: `screenshots/ViewLogs.png` });
    await page.waitForTimeout(5000);
    await page.locator(el.ImportPage.clmvalName).click();
    await page.locator(el.ImportPage.rightArrow).click();
    await page.locator(el.homePage.btnGo).click();
  }

  async refreshPage() {
    await page.waitForTimeout(20000);
    await page.locator(el.homePage.btnGo).click();
    console.log('Refreshed the page');
  }

  /**
   * @author: Srijanani
   * @Function_Name : selectImportLog
   * @Description : This Function selects the latest log from the table
   * @Params : none
   * @returns : none
   */

  async selectImportLog() {
    await page.locator(el.ImportPage.tableSearchResults).nth(1).click();
    await page.waitForTimeout(7000);
  }

  /**
   * @author: Srijanani
   * @Function_Name : verifyImportLog
   * @Description : This Function verifies the name and status in Import Log
   * @Params : none
   * @returns : none
   */

  async verifyImportLog() {
    const nameField = await page
      .locator(el.ImportLogPage.nameField)
      .innerText();
    expect(nameField).toEqual(ImportName);
    console.log(
      'Test Name' + nameField,
      '& Name Given While Importing' + ImportName,
    );
    const ImportStatus = await page
      .locator(el.ImportLogPage.statusField)
      .innerText();
    expect(ImportStatus).toEqual('Completed');
    console.log('Import Status: ', ImportStatus);
    await objReportLog.log('Import Status: ' + ImportStatus);
  }

  /**
   * @author: Srijanani
   * @Function_Name : verifyRecords
   * @Description : This Function verifies the total, success and failure records in Import
   * @Params : none
   * @returns : none
   */

  async verifyRecords() {
    totalRecords = await page
      .locator(el.ImportLogPage.totalRecords)
      .textContent();
    console.log('Total Records: ', totalRecords);
    await objReportLog.log('Total Records: ' + totalRecords);

    const successRecords = await page
      .locator(el.ImportLogPage.successCount)
      .textContent();
    const failedRecords = await page
      .locator(el.ImportLogPage.failureCount)
      .textContent();

    if (parseInt(totalRecords) == parseInt(successRecords)) {
      await objReportLog.log(
        'All Records Imported Successfully. Success Records: ' + successRecords,
      );
    } else if (parseInt(failedRecords) == parseInt(totalRecords)){
      await objReportLog.log(
        'All Records Failed to Import. Failed Records : ' + failedRecords,
      );
      // await page.locator(el.ImportLogPage.logFile).click();
    }
    else {
      expect(parseInt(successRecords) + parseInt(failedRecords)).toEqual(parseInt(totalRecords));
      await objReportLog.log(
        'Total Records: ' + totalRecords + ' Success Records: ' + successRecords + ' Failed Records: ' + failedRecords,
      );
    }
    expect(parseInt(successRecords)).toBe(parseInt(totalRecords));
    await page.screenshot({ path: `screenshots/ImportLog.png` });
  }

  /**
   * @author: Srijanani
   * @Function_Name : goToRecordDataTab
   * @Description : This Function navigates to Record Data Tab
   * @Params : none
   * @returns : none
   */

  async goToRecordDataTab() {
    await page.locator(el.ImportLogPage.tabRecordData).click();
    await page.waitForTimeout(5000);
  }

  /**
   * @author: Srijanani
   * @Function_Name : selectAndVerifyEntity
   * @Description : This Function selects the entity and verifies the data in the new tab
   * @Params : none
   * @returns : none
   */

  async selectAndVerifyEntity() {
    const tableData = await page
      .locator(el.ImportLogPage.tableRecordData)
      .nth(1);
    const tableDataText = await tableData.innerText();
    console.log('Table Data: ', tableDataText);
    const rows = await tableData.locator('tr');
    const rowCount = await rows.count();
    console.log('Row Count: ', rowCount);
    await objReportLog.log('Row Count: ' + rowCount);
    expect(parseInt(rowCount)).toEqual(parseInt(totalRecords));

    for (let i = 0; i < rowCount; i++) {
      const entityCode = await page.locator(el.ImportLogPage.entityCode).nth(i);
      const [newPage] = await Promise.all([
        context.waitForEvent('page', { timeout: 60000 }),
        entityCode.click(),
      ]);
      await newPage.waitForLoadState();
      await newPage.waitForTimeout(10000);
      console.log('New tab loaded');
      screenshotCounter++;
      const screenshotPath = `screenshots/ImportEntity_${screenshotCounter}.png`;
      await newPage.screenshot({ path: screenshotPath });
      await newPage.waitForTimeout(5000);
      await newPage.close();
      await page.bringToFront();
    }
  }
}

module.exports = { ImportPage };
