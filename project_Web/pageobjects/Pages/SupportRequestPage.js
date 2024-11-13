const { test, expect } = require('@playwright/test');
const  {ReportLog} = require('../../../Utils/report-util');
const {CommonUtils} = require('../../../Utils/common-util');
const el = require('../elements/elements');
const td = require('../data-files/test-data');

let SR_Status;
let paymentStatus;
let paymentLink;

const objReportLog = new ReportLog();
const commonUtils = new CommonUtils();

class SupportRequestPage {
  /**
   * @author: Srijanani
   * @Function_Name : requestTab
   * @Description : This Function fills the details in Request Tab of Support Request
   * @Params : none
   * @returns : none
   */

  async requestTab() {
    await page.selectOption(
      el.SR_RequestTab.primaryContact,
      td.TestDatasupportRequest.primaryContact,
    );
    await objReportLog.log('Primary Contact Selected');
    await page.selectOption(
      el.SR_RequestTab.preferredContactMethod,
      td.TestDatasupportRequest.preferredContactMethod,
    );
    await objReportLog.log('Preferred Contact Method Selected');
    await page.selectOption(
      el.SR_RequestTab.requestType,
      td.TestDatasupportRequest.reqType,
    );
    await page.selectOption(
      el.SR_RequestTab.source,
      td.TestDatasupportRequest.source,
    );
    await objReportLog.log('Request Tab Updated');
  }

  /**
   * @author: Srijanani
   * @Function_Name : productTab
   * @Description : This Function fills the details in Product Tab of Support Request
   * @Params : none
   * @returns : none
   */

  async productTab() {
    await page.locator(el.SRTabs.tabProducts).click();
    await page.selectOption(
      el.SR_ProductsTab.serviceType,
      td.TestDatasupportRequest.serviceType,
    );
    await page.selectOption(
      el.SR_ProductsTab.concernType,
      td.TestDatasupportRequest.concernType,
    );
    await page.locator(el.SR_ProductsTab.concernDetail).fill('Back Alignment Problem');
    await objReportLog.log('Product Tab Updated');
  }

  /**
   * @author: Srijanani
   * @Function_Name : visitTab
   * @Description : This Function fills the details in Visit Tab of Support Request
   * @Params : none
   * @returns : none
   */

  async visitTab() {
    await page.locator(el.SRTabs.tabVisits).click();
    await page.locator(el.SR_VisitsTab.btnaddVisit).click();
    await page.selectOption(
      el.SR_VisitsTab.repairSiteType,
      td.TestDatasupportRequest.siteType,
    );
    await page.selectOption(
      el.SR_VisitsTab.preferredTime,
      td.TestDatasupportRequest.preferredTime,
    );
    await page.selectOption(el.SR_VisitsTab.duration, '1');
    await objReportLog.log('Visit Tab Updated');
  }

  /**
   * @author: Srijanani
   * @Function_Name : laborTab
   * @Description : This Function fills the details in Labor Tab of Support Request
   * @Params : none
   * @returns : none
   */
  async laborTab() {
    await page.locator(el.SRTabs.tabLabor).click();
    await page.locator(el.SR_LaborTab.SRT).fill('TEST_SRT');
    await page.locator(el.SR_LaborTab.adjustedHours).fill('2');
    await page.locator(el.SR_LaborTab.adjustedAmount).fill('2');
    await page.locator(el.SR_LaborTab.adjustedTotalAmount).click();
    await page.waitForTimeout(5000);
    // await page.selectOption(
    //   el.supportRequestPage.reasonDD,
    //   td.TestDatasupportRequest.reason,
    // );
    await objReportLog.log('Labor Tab Updated');
  }

    /**
   * @author: Srijanani
   * @Function_Name : adjustlaborTab
   * @Description : This Function adjusts the details in Labor Tab of Support Request
   * @Params : none
   * @returns : none
   */
    async adjustlaborTab() {
      await page.locator(el.SR_LaborTab.adjustedAmount).fill('0');
      await page.locator(el.SR_LaborTab.adjustedTotalAmount).click();
      await page.waitForTimeout(3000);
      await page.selectOption(
        el.SR_LaborTab.reasonDD,
        td.TestDatasupportRequest.reason,
      );
  
    }
  /**
   * @author: Srijanani
   * @Function_Name : saveSupportRequest
   * @Description : This Function saves the Support Request
   * @Params : none
   * @returns : none
   */

  async saveSupportRequest() {
    await page.locator(el.supportRequestPage.saveSR).nth(1).click();
    await objReportLog.log('Support Request Saved');
    await page.waitForTimeout(15000);
    const SR_ID = await page
      .locator(el.supportRequestPage.SRID)
      .nth(1)
      .innerText();
    console.log('SR ID : ' + SR_ID);
    SR_Status = await page.locator(el.supportRequestPage.SRStatus).innerText();
    console.log('SR Status : ' + SR_Status);
    await objReportLog.log(
      'Support Request ID ' + SR_ID,
      'Status: ' + SR_Status,
    );
  }

  /**
   * @author: Srijanani
   * @Function_Name : submitSupportRequest
   * @Description : This Function submits the Support Request
   * @Params : none
   * @returns : none
   */

  async submitSupportRequest() {
    await page.locator(el.supportRequestPage.submitSR).nth(1).click();
    await objReportLog.log('Support Request Submitted');
    await page.waitForTimeout(15000);
    SR_Status = await page.locator(el.supportRequestPage.SRStatus).innerText();
    console.log('SR Status after Submiting: ' + SR_Status);
    await objReportLog.log(
      'Support Request Status is Captured after Submitting : ' + SR_Status,
    );
    await expect(SR_Status).toContain('Pending');
  }

   /**
   * @author: Ketan
   * @Function_Name : partsTab
   * @Description : This Function Add's a Part in Parts section and Check the order Checkbox
   * @Params : part
   * @returns : none
   */
   async partsTab(part) {
    await page.locator(el.SRTabs.tabParts).click();
    await page.locator(el.SR_PartTab.partSearch).fill(part);
    await page.locator(el.SR_PartTab.partSearchIcon).click();
    await page.locator(el.SR_PartTab.searchResult).click();
    await page.waitForLoadState('networkidle');
    await page.locator(el.SR_PartTab.partSearchSelect).click();
    await page.waitForLoadState('networkidle');
    await page.locator(el.SR_PartTab.orderCheckbox).nth(0).check();
    await page.waitForTimeout(5000);

  }
    /**
   * @author: Ketan
   * @Function_Name : placePartOrder
   * @Description : This Function creates part order and validates the success message
   * @Params : none
   * @returns : none
   */
  
  async placePartOrder() {
    await page.locator(el.SR_PartTab.saveButton).click();
    await page.waitForLoadState('networkidle');
    //await page.locator(el.SR_PartTab.submitButton).click();
    await page.selectOption(
      el.SR_PartTab.moreDDParts,
      td.TestDatasupportRequest.partOrder,
    );
    await objReportLog.log('Part Order Placed');
    
    const SaveMessage = await page
      .locator(el.SR_PartTab.successMessage)
      .innerText();
    const strExpectedMessage = 'Order created successfully';
    await page.screenshot({ path: `screenshots/PartOrderSuccess.png` });
    await commonUtils.compareActualAndExpectedText(
      SaveMessage,
      strExpectedMessage,
    );
    await objReportLog.log(SaveMessage);
  }
   /**
   * @author: Ketan
   * @Function_Name : summaryPage
   * @Description : This Function validates Summary Page
   * @Params : none
   * @returns : none
   */
  async summaryPage(){
    await page.locator(el.SRTabs.tabSummary).click();
    await page.waitForTimeout(3000);
    const TotalPartAmount = await page.locator(el.SR_SummaryTab.totalPartAmount).innerText();
    await objReportLog.log('Total Part Amt : ' + TotalPartAmount);
    const TotalLabourAmount = await page.locator(el.SR_SummaryTab.totalLabourAmount).innerText();
    await objReportLog.log('Total Labor Amt : ' + TotalLabourAmount);
    const TotalTax = await page.locator(el.SR_SummaryTab.totalTax).innerText();
    await objReportLog.log('Total Tax : ' + TotalTax);
    const TotalAmt= await page.locator(el.SR_SummaryTab.totalAmt).innerText();
    await objReportLog.log('Payment From : ' + TotalAmt);
    const result = await commonUtils.compareConvertedStringsWithInteger(TotalPartAmount, TotalLabourAmount,TotalTax,TotalAmt);
    await expect(result).toBe(true);
    //await expect(TotalLabourAmount).toBe(placePartOrder.SaveMessage);
}
 
  /**
   * @author: Srijanani
   * @Function_Name : selectCustomerPay
   * @Description : This Function selects the Customer Pay option
   * @Params : none
   * @returns : none
   */

  async selectCustomerPay() {
    await page.locator(el.SR_Payment.moreDD).nth(1).click();
    await page.waitForTimeout(2000);
    await page.locator(el.SR_Payment.customerPay).nth(1).click();
    await objReportLog.log('Customer Pay Selected');
}

  /**
   * @author: Srijanani
   * @Function_Name : validatePaymentPage
   * @Description : This Function validates all the fields of payment page
   * @Params : none
   * @returns : none
   */

    async validatePaymentPage() {
      await page.waitForTimeout(5000);
      const EntityStatus = await page.locator(el.SR_Payment.entityStatus).innerText();
      await objReportLog.log('Entity Status : ' + EntityStatus);
      const Currency = await page.locator(el.SR_Payment.currency).innerText();
      await objReportLog.log('Currency : ' + Currency);
      const Category = await page.locator(el.SR_Payment.category).nth(0).innerText();
      await objReportLog.log('Category : ' + Category);
      const PaymentFrom = await page.locator(el.SR_Payment.paymentFrom).innerText();
      await objReportLog.log('Payment From : ' + PaymentFrom);
      const PaymentTo = await page.locator(el.SR_Payment.paymentTo).innerText();
      await objReportLog.log('Payment To : ' + PaymentTo);
      // const PaymentReference = await page.locator(el.SR_Payment.paymentReference).innerText();
      // await objReportLog.log('Payment Reference : ' + PaymentReference);
      const tablePaymentList = await page.locator(el.SR_Payment.tablePaymentList).innerText();
      await objReportLog.log('Payment List : ' + tablePaymentList);
      const paymentSummary = await page.locator(el.SR_Payment.paymentSummary).innerText();
      await objReportLog.log('Payment Summary : ' + paymentSummary);
      paymentStatus = await page.locator(el.SR_Payment.paymentStatus).innerText();
      await objReportLog.log('Status : ' + paymentStatus);
    }

  /**
   * @author: Srijanani
   * @Function_Name : getPaymentLink
   * @Description : This Function gets the Payment Link
   * @Params : none
   * @returns : none
   */

  async getPaymentLink() {
    await page.locator(el.SR_Payment.paymentOptions).selectOption('Automated Voice Payment');
    await objReportLog.log('Payment Option Selected');
    await page.waitForTimeout(3000);
    await page.locator(el.SR_Payment.btnSubmitPayment).click();
    await page.waitForTimeout(10000);
    paymentStatus = await page.locator(el.SR_Payment.paymentStatus).innerText();
    await objReportLog.log('Status : ' + paymentStatus);
    const paymentID = await page.locator(el.SR_Payment.paymentID).nth(0).innerText();
    await objReportLog.log('Payment ID : ' + paymentID);
    paymentLink = await page.locator(el.SR_Payment.paymentLink).innerText();
    await objReportLog.log('Payment Link : ' + paymentLink);
  }
 

  /**
   * @author: Srijanani
   * @Function_Name : openPaymentLink
   * @Description : This Function opens the Payment Link in New tab
   * @Params : none
   * @returns : none
   */

    async openPaymentLink() {
      const newPage = await browser.newPage();
      await newPage.goto(paymentLink);
      await newPage.waitForTimeout(50000);
      await objReportLog.log('Payment Link Opened in New Tab');
    }

    async fillPaymentTab(){
      await page.locator('#CollectJSInlineccnumber').contentFrame().getByPlaceholder('0000 0000 0000').click();
      await page.locator('#CollectJSInlineccnumber').contentFrame().getByPlaceholder('0000 0000 0000').fill('4111 1111 1111 1111');
      await page.locator('#CollectJSInlineccexp').contentFrame().getByPlaceholder('Expiration (MM/YY)').click();
      await page.locator('#CollectJSInlineccexp').contentFrame().getByPlaceholder('Expiration (MM/YY)').fill('12 / 25');
      await page.locator('#CollectJSInlinecvv').contentFrame().getByPlaceholder('CVV').click();
      await page.locator('#CollectJSInlinecvv').contentFrame().getByPlaceholder('CVV').fill('111');
      await page.locator('div').filter({ hasText: /^Name on card \*$/ }).nth(2).click();
      await page.getByLabel('Name on card *').fill('Janani');
      await page.getByText('City *State *Zip *').click();
      await page.locator('.cdk-overlay-backdrop').click();
      await page.getByLabel('Billing Address *').click();
      await page.getByLabel('Billing Address *').fill('14 Park Street');
      await page.locator('div').filter({ hasText: /^City \*$/ }).nth(2).click();
      await page.getByLabel('City *').fill('Boston');
      await page.getByLabel('City *').press('Tab');
      await page.getByPlaceholder('#####').click();
      await page.getByPlaceholder('#####').fill('02452');
    }
  /**
   * @author: Srijanani
   * @Function_Name : resolveVisit
   * @Description : This Function resolves all the visit in Support Request
   * @Params : none
   * @returns : none
   */

  async resolveVisit() {
    // await page.locator(el.SR_Payment.btnClose).click();
    // await page.locator(el.supportRequestPage.btnRefresh).click();
    // await page.waitForTimeout(15000);
    await page.locator(el.SRTabs.tabVisits).click();
    await page.locator(el.SR_VisitsTab.btnExpandVisit).click();
    await page.locator(el.SR_VisitsTab.visitRequestStatus).selectOption('Completed');
    await page.locator(el.supportRequestPage.saveSR).nth(1).click();
    await objReportLog.log('Visit Resolved');
  }

    /**
   * @author: Srijanani
   * @Function_Name : resolveServiceRequest
   * @Description : This Function resolves all the Service Requests in Support Request
   * @Params : none
   * @returns : none
   */

    async resolveServiceRequest() {
      await page.locator(el.SRTabs.tabProducts).click();
      await page.locator(el.SR_ProductsTab.btnExpandProduct).click();
      await page.locator(el.SR_ProductsTab.serviceRequestStatus).selectOption('Completed');
      await page.locator(el.supportRequestPage.saveSR).nth(1).click();
      await objReportLog.log('Service Request Resolved');
    }

      /**
   * @author: Srijanani
   * @Function_Name : resolveSupportRequest
   * @Description : This Function the Support Request
   * @Params : none
   * @returns : none
   */

      async resolveSupportRequest() {
        await page.locator(el.supportRequestPage.btnResolved).nth(1).click();
        await page.waitForTimeout(3000);
        await page.selectOption(el.supportRequestPage.DDresolutionType, td.TestDatasupportRequest.resolutionType);
        await page.locator(el.supportRequestPage.resolutionDescription).fill('Resolved');
        await page.locator(el.supportRequestPage.btnSaveResolution).click();
        await page.waitForTimeout(8000);
        await objReportLog.log('Support Request Resolved');
        SR_Status = await page.locator(el.supportRequestPage.SRStatus).innerText();
        console.log('SR Status: ' + SR_Status);
        await objReportLog.log(
          'Support Request Status : ' + SR_Status,
        );
        await expect(SR_Status).toContain('Resolved');
      }
    }
module.exports = { SupportRequestPage };
