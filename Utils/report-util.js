const logger = require('../support/logger.js');

class ReportLog {
    async log(msg) {
        // logs the message to cucumber report and logger file
        global.report += `${new Date()
            .toISOString()
            .replace(/T/, ' ')
            .replace(/\..+/, '')} - ${global.pageName} :: ${msg}</br>`;
        logger.info(`${global.pageName} : ${msg}`);
    }

    async errorLog(msg) {
        // logs the message to cucumber report and logger file
        const errorLog = `<span style="color:red;font-size: 20px;"><b>${msg}</b></span>`;
        global.report += `${new Date()
            .toISOString()
            .replace(/T/, ' ')
            .replace(/\..+/, '')} - ${global.pageName} :: ${errorLog}</br>`;
        logger.info(`${global.pageName} : ${msg}`);
    }

    async logHdr(msg) {
        // logs the header message to cucumbe report and logger file
        global.report += `<strong> <p style="color:blue;">${msg}</p></strong>`;
        logger.info(msg);
    }
}

module.exports = { ReportLog };
