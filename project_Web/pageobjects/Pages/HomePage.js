const { test, expect } = require('@playwright/test');
const { ReportLog } = require('../../../Utils/report-util');
const el = require('../elements/elements');
const { CommonUtils } = require('../../../Utils/common-util');

const objReportLog = new ReportLog();
const commonUtils = new CommonUtils();

let modules;

class HomePage {
  /**
   * @author: Srijanani
   * @Function_Name : getSmartBloxModules
   * @Description : This Function gets all the Modules in Smart Blox
   * @Params : none
   * @returns : none
   */

  async getSmartBloxModules() {
    modules = await page.locator(el.homePage.titles).allTextContents();
    await objReportLog.log('Modules are displayed');
    console.log('Modules : ', modules);
  }

  /**
   * @author: Srijanani
   * @Function_Name : selectModulefromSmartBlox
   * @Description : This Function selects the module from Smart Blox
   * @Params : moduleName String
   * @returns : none
   */

  async selectModulefromSmartBlox(moduleName) {
    const count = await page.locator(el.homePage.titles).count();
    for (let i = 0; i < count; ++i) {
      const modules = await page
        .locator(el.homePage.titles)
        .nth(i)
        .textContent();
      if (modules.trim() === moduleName) {
        await page.locator(el.homePage.titles).nth(i).click();
        break;
      }
    }
    await objReportLog.log('Module Selected');
    await page.waitForTimeout(5000);
  }

  /**
   * @author: Srijanani
   * @Function_Name : selectGoToMenu
   * @Description : This Function selects Go Button
   * @Params : none
   * @returns : none
   */

  async selectGoToMenu() {
    await objReportLog.log('Going to click on Go To Menu');
    await page.locator(el.homePage.btnGoToMenu).click();
    await page.waitForTimeout(5000);
    await objReportLog.log('Go To Menu Selected');
  }

  /**
   * @author: Srijanani
   * @Function_Name : selectCXModule
   * @Description : This Function selects CX Connect Module
   * @Params : none
   * @returns : none
   */

  async selectCXModule() {
    await page.locator(el.homePage.CXModule).click();
    await page.waitForTimeout(5000);
    await objReportLog.log('CX Connect Module Selected');
  }

  /**
   * @author: Srijanani
   * @Function_Name : searchInDropdown
   * @Description : This Function searches in the Omni Search Menu dropdown
   * @Params : none
   * @returns : none
   */

  async searchInDropdown() {
    await page.locator(el.homePage.searchIn).click();
    const countDD = await page.locator(el.homePage.searchDD).count();
    for (let j = 0; j < countDD; ++j) {
      const options = await page
        .locator(el.homePage.searchDD.nth(i))
        .textContent();
      if (options.trim() === optionName) {
        await page.locator(el.homePage.searchDD.nth(i)).click();
        break;
      }
    }
  }

  /**
   * @author: Srijanani
   * @Function_Name : startSearching
   * @Description :This Function enters the search text and clicks on Go Button
   * @Params : searchText String
   * @returns : none
   */

  async startSearching(searchText) {
    await page.locator(el.homePage.searchBox).fill(searchText);
    await page.locator(el.homePage.btnGo).click();
    await objReportLog.log('Searched');
    await page.waitForTimeout(50000);
  }
}
module.exports = { HomePage };
