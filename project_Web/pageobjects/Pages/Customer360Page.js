const { test, expect } = require('@playwright/test');
const { ReportLog } = require('../../../Utils/report-util');
const el = require('../elements/elements');

const objReportLog = new ReportLog();

class Customer360Page {
  /**
   * @author: Srijanani
   * @Function_Name : createSupportRequest
   * @Description : This Function selects the product and creates a support request
   * @Params : none
   * @returns : none
   */

  async createSupportRequest() {
    await page.waitForTimeout(5000);
    await page.locator(el.customer360Page.products).click();
    await objReportLog.log('Product selected');
    await page.locator(el.customer360Page.btnCreateSupportRequest).click();
    await objReportLog.log('Create Support Request button clicked');
  }
}

module.exports = { Customer360Page };
