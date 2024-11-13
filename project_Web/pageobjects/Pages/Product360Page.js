const { test, expect } = require('@playwright/test');
const { ReportLog } = require('../../../Utils/report-util');
const el = require('../elements/elements');
const td = require('../data-files/test-data');

const objReportLog = new ReportLog();
class Product360Page {
     /**
     * @author: Ketan
     * @Function_Name : This function is used to select the Product Module
     * @Description : 
     * @Params : none
     * @returns : none
     */
    async selectModule() {
        await page.locator(el.product360Page.products).click();
      }

    /**
     * @author: Ketan
     * @Function_Name : This function is used to open the Product 360 Page
     * @Description : 
     * @Params : none
     * @returns : none
     */
  
    async openProduct360() {
        await page.locator(el.product360Page.product360).nth(1).click();
        await objReportLog.log('Product 360 Page Opened');
    }
    /**
     * @author: Ketan
     * @Function_Name :  this function is used to fill the Product 360 Details
     * @Description : 
     * @Params : ali,styleNumber
     * @returns : none
     */
    async fillProduct360Details(ali,styleNumber) {
        await page.locator(el.product360Page.aliNumber).fill(ali);
        await page.locator(el.product360Page.styleNumber).fill(styleNumber);
    }
    /**
     * @author: Ketan
     * @Function_Name : This function is used to click on the Search Button
     * @Description : 
     * @Params : none
     * @returns : none
     */
    async clickSearch() {
        await page.locator(el.product360Page.btnSearch).click();
    }
    /**
     * @author: Ketan
     * @Function_Name : This function is used to click on the Search Button
     * @Description : 
     * @Params : none
     * @returns : none
     */
    async selectProductRegistration() {
        //await page.locator(el.product360Page.DDcreate).click();
        await page.waitForLoadState('networkidle');
        await page.getByRole('button', { name: 'Create' }).click();
        console.log('clicked on create');
        await page.waitForTimeout(2000);
        //await page.getByRole('button', { name: '  Product Registration' }).click();
        await page.locator(el.product360Page.btnProductRegistration).last().click();
        await objReportLog.log('Navigated to Product Registration');
    }
    

}
  module.exports = { Product360Page };