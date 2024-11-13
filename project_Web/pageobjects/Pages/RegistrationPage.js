const { test, expect } = require('@playwright/test');
const { ReportLog } = require('../../../Utils/report-util');
const { CommonUtils } = require('../../../Utils/common-util');
const el = require('../elements/elements');
const td = require('../data-files/test-data');

const objReportLog = new ReportLog();
const commonUtils = new CommonUtils();

class RegistrationPage {
  /**
   * @author: Ketan
   * @Function_Name : selectModule
   * @Description : This Function selects the module from Smartblox
   * @Params : none
   * @returns : none
   */
  async selectModule() {
    await page.locator(el.registrationPage.registrationBlox).click();
  }

  /**
   * @author: Ketan
   * @Function_Name : newProductRegistrationPage
   * @Description : This Function navigates to the New Product Registration Page
   * @Params : none
   * @returns : none
   */
  async newProductRegistrationPage() {
    await page.waitForLoadState('networkidle');
    await objReportLog.log('Navigated to the URL');
  }

  /**
   * @author: Ketan
   * @Function_Name : clickNew
   * @Description : This Function clicks on the New Button for Registration
   * @Params : none
   * @returns : none
   */

  async clickNew() {
    await page.waitForLoadState('networkidle');
    await page.locator(el.registrationPage.NewButton).nth(0).click();
  }

  /**
   * @author: Ketan
   * @Function_Name : registrationTab
   * @Description : This Function fills the Registration Tab 
   * @Params : ali
   * @returns : none
   */

  async registrationTab(ali) {
    await page.locator(el.registrationPage.ALI).fill(ali);

    await page.keyboard.press('Enter');
    //await page.locator(el.registrationPage.uploadFile).click();
    await page.waitForTimeout(9000);
    await page.waitForLoadState('networkidle');
  }
    /**
   * @author: Ketan
   * @Function_Name : registrationTab
   * @Description : This Function fills the customerDelivery and Sales ticket no
   * @Params : none
   * @returns : none
   */
  async customerDelivery() {
    await page.locator(el.registrationPage.customerDeliveryDate).fill(td.TestDataregistrationPage.date);
    await page.locator(el.registrationPage.salesTicket).fill('123');
  }

  /**
   * @author: Ketan
   * @Function_Name : customerTab
   * @Description : This Function fills the Customer Tab and uploads the file
   * @Params : customer
   * @returns : none
   */

  async customerTab(customer) {
    //Uploading file

    const fileInput = await page.locator(el.registrationPage.uploadFile);
    const filePath =
      'project_Web/Files-to-upload/Proof_of_Purchase_Registration.pdf';
    await fileInput.setInputFiles(filePath);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: `screenshots/RegistrationFileUpload.png` });
    await objReportLog.log('File attached successfully');
    await page.selectOption(
      el.registrationPage.customerType,
      td.TestDataregistrationPage.CustomerType,
    );
    await objReportLog.log('Contact Type Selected');

    await page.locator(el.registrationPage.customer).fill(customer);
    //await page.locator(el.registrationPage.customerSearchIcon).click();
  }

  /**
   * @author: Ketan
   * @Function_Name : warrantyTab
   * @Description : This Function fills the Warranty Tab
   * @Params : none
   * @returns : none
   */

  async warrantyTab() {
    await page.locator(el.registrationPage.warrantyTab).textContent();
  }

  /**
   * @author: Ketan
   * @Function_Name : saveAndRegister
   * @Description : This Function Saves and Registers the Product
   * @Params : none
   * @returns : none
   */
  async saveAndRegister() {
    await page.evaluate(() => window.scrollTo(0, 0));

    await page.locator(el.registrationPage.saveButton).click();
    await objReportLog.log('Save Button Clicked');
    await page.waitForTimeout(5000);
    const SaveMessage = await page.locator(el.registrationPage.saveMessage).innerText();

    const strExpectedMessage = 'Saved Successfully';
    await page.waitForTimeout(5000);
    await page.screenshot({ path: `screenshots/SavedSuccessfully.png` });
    await commonUtils.compareActualAndExpectedText(SaveMessage,strExpectedMessage);
    await objReportLog.log(SaveMessage);

    await page.locator(el.registrationPage.registerButton).click();
    await objReportLog.log('Registration Button Clicked');
    await page.waitForLoadState('networkidle');
    const RegisterMessage = await page
      .locator(el.registrationPage.saveMessage)
      .innerText();
    console.log(RegisterMessage);
    await page.waitForTimeout(5000);
    await page.screenshot({ path: `screenshots/RegisteredSuccessfully.png` });
    await commonUtils.compareActualAndExpectedText(RegisterMessage,strExpectedMessage,);
    await objReportLog.log(RegisterMessage);
    await page.waitForTimeout(10000);
    await objReportLog.log('Product Registered Successfully');
  }
    /**
   * @author: Ketan
   * @Function_Name : transfer
   * @Description : This function transfers the product
   * @Params : none
   * @returns : none
   */
  async transfer(){
    await page.waitForLoadState('networkidle');
    await page.selectOption(
      (el.registrationPage.moreDD).nth(1),
      td.TestDataregistrationPage.Transfer,
    );
  }
   /**
   * @author: Ketan
   * @Function_Name : Re-open
   * @Description : This function Re-open the product
   * @Params : none
   * @returns : none
   */
  async reOpen(){
    await page.waitForLoadState('networkidle');
    await page.selectOption(page.locator(el.registrationPage.moreDD).nth(1), td.TestDataregistrationPage.Reopen);
  }
   /**
   * @author: Ketan
   * @Function_Name : reject
   * @Description : This function reject the product
   * @Params : none
   * @returns : none
   */
  async reject(){
    await page.waitForLoadState('networkidle');
    await page.selectOption(
      el.registrationPage.moreDD,
      td.TestDataregistrationPage.Reject,
    );
  }
}

module.exports = { RegistrationPage };
