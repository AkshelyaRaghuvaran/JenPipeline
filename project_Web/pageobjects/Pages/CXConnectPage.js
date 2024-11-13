const { test, expect } = require('@playwright/test');
const { ReportLog } = require('../../../Utils/report-util');
const el = require('../elements/elements');
const td = require('../data-files/test-data');

const objReportLog = new ReportLog();

class CXConnectPage {
  /**
   * @author: Srijanani
   * @Function_Name : selectActioninCXConnect
   * @Description : This Function gets CX Connect module and clicks on Import/Export module
   * @Params : none
   * @returns : none
   */

  async selectActioninCXConnect() {
    const CXConnectModules = await page
      .locator(el.CXConnectPage.listModules)
      .allTextContents();
    console.log('CX Connect Modules : ', CXConnectModules);
    await objReportLog.log('CX Connect Modules are displayed');

    await page.locator(el.CXConnectPage.moduleImportExport).nth(2).click();
    await objReportLog.log('Import/Export Module Selected');
    await page.waitForTimeout(5000);
    await page.locator(el.homePage.btnGo).click();
    await page.waitForTimeout(5000);
  }
}
module.exports = { CXConnectPage };

// async importTab_updateSearchColumns() {
//   const ColumnValues = await page
//     .locator(el.ImportPage.advSearchColumns)
//     .allTextContents();
//   await objReportLog.log(ColumnValues);
//   await page.locator(el.ImportPage.clmvalName).click();
//   await page.locator(el.ImportPage.rightArrow).click();
//   await page.locator(el.ImportPage.topArrow).click();
//   await page.locator(el.ImportPage.btnAdvSearch).click();
// }

// async importLog() {
//   const AdvanceSearchResult = await page
//     .locator(el.ImportPage.tableAdvSearchResults)
//     .allTextContents();
//   await objReportLog.log('Search Results' + AdvanceSearchResult);
// }

// ImportName = 'Test Import d5812726-366f-4a4d-8e4c-07c4572b79ef';
// console.log('ImportName: ', ImportName);
// const table = await page
//   .locator(el.ImportPage.tableAdvSearchResults)
//   .nth(1);
// const rows = await table.locator('tr');
// rows.first().waitFor();
// console.log(rows.first().allTextContents());

// for (let j = 0; j < (await rows.length); ++j) {
//   const text = await rows.nth(j).locator('td').textContent();
//   if (text.includes(ImportName)) {
//     await rows.nth(j).locator('td').click();
//     break;
//   }
// }
// await page.waitForTimeout(5000);
// await objReportLog.log('Import Log Selected');
// await page.waitForTimeout(5000);
// await page.screenshot({ path: `screenshots/ImportLog.png` });
