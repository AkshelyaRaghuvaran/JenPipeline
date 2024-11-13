const { test, expect } = require('@playwright/test');
const { ReportLog } = require('../../../Utils/report-util');
const el = require('../elements/elements');

const objReportLog = new ReportLog();

class LoginPage {
  /**
   * @author: Srijanani
   * @Function_Name : goTo
   * @Description : Navigate to the URL
   * @Params : none
   * @returns : none
   */

  async goTo() {
    await page.goto('https://lazboyuat.mizecx.com/login.html');
    await objReportLog.log('Navigated to the URL');
  }

  /**
   * @author: Srijanani
   * @Function_Name : validLogin
   * @Description : This Function logs in to the application
   * @Params : userName String, passWord String
   * @returns : none
   */

  async validLogin(userName, passWord) {
    await page.locator(el.loginPage.username).fill(userName);
    await page.locator(el.loginPage.password).fill(passWord);
    await page.locator(el.loginPage.btnLogin).click();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(50000);
  }
}

module.exports = { LoginPage };
