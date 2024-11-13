const { expect } = require('@playwright/test');
const { ReportLog } = require('./report-util');

const objReportLog = new ReportLog();

class CommonUtils {
  /**
   * @author: Srijanani
   * @Function_Name : uploadFile
   * @Description : This Function uploads file.
   * @Params :
   * - fileLocator: A selector to locate the file input element.
   * - filePath: The path of the file to upload.
   * @returns : none
   */
  async uploadFile(fileLocator, filePath) {
    const input = await page.locator(fileLocator);
    await input.setInputFiles(filePath);
  }

  /**
   * @author: Srijanani
   * @Function_Name : CompareAndClick
   * @Description : This Function gets the list of items, compares with user input and select the value that matches with user input.
   * @Params :
   *   - menuItemsLocator: A selector to locate the menu items.
   *   - moduleName: The name of the module to select.
   * @returns : none
   */

  async CompareAndClick(menuItemsLocator, moduleName) {
    const count = await page.locator(menuItemsLocator).count();
    for (let i = 0; i < count; ++i) {
      const text = await page.locator(menuItemsLocator).nth(i).textContent();
      if (text.trim() === moduleName) {
        await page.locator(menuItemsLocator.nth(i)).click();
        break;
      }
    }
  }

  /**
   * @author: Srijanani
   * @Function_Name : compareActualAndExpectedText
   * @Description : This Function compares a text from website with string value. Then will add the result in report
   * @Params : xpath Object of text value,String
   * @returns : None
   */
  async compareActualAndExpectedText(strActualText, strExpText) {
    try {
      // Log the input values
      console.log(`compareActualAndExpectedText called with:`);
      console.log(`  strActualText: ${strActualText}`);
      console.log(`  strExpText: ${strExpText}`);
      // Log the initial comparison
      objReportLog.log(`Comparing actual text "${strActualText}" with expected text "${strExpText}"`);

      // Check if actual text is the same as the expected text and log the message
      if (strActualText === strExpText) {
        objReportLog.log(`Expected value "${strExpText}" matches with "${strActualText}"`);
      } else {
        objReportLog.log(`Expected value "${strExpText}" does not match with "${strActualText}"`);
        throw new Error(`Expected value "${strExpText}" does not match with "${strActualText}"`);
      }
    } catch (error) {
      // Log any errors that occur
      console.error(`Error in compareActualAndExpectedText: ${error.message}`);
      throw error;
    }
  }

  /**
   * @author: Srijanani
   * @Function_Name : scrollPage
   * @Description : This Function scrolls the page in the specified direction by the specified amount.
   * @Params :
   * - direction: The direction to scroll the page. Can be "up", "down", "left", or "right".
   * - amount: The amount to scroll the page by.
   * @returns : none
   */

  async scrollPage(direction, amount) {
    switch (direction) {
      case 'up':
        window.scrollBy(0, -amount);
        break;
      case 'down':
        window.scrollBy(0, amount);
        break;
      case 'left':
        window.scrollBy(-amount, 0);
        break;
      case 'right':
        window.scrollBy(amount, 0);
        break;
      default:
        console.error(
          'Invalid direction. Use "up", "down", "left", or "right".',
        );
    }
  }
   /**
   * @author: Ketan
   * @Function_Name : compareConvertedStringsWithInteger
   * @Description : This function converts string to integer and compares with integer value.
   * @Params :string1, string2,string3,string4
   * 
   * @returns : total
   */
  async compareConvertedStringsWithInteger(string1, string2,string3,string4){
    const num1 = parseInt(string1, 10);
    const num2 = parseInt(string2, 10);
    const num3 = parseInt(string3, 10);
    const intValue= parseInt(string4,10);
    const total = num1 + num2 + num3;
    return total === intValue;

  }
}
module.exports = { CommonUtils };
