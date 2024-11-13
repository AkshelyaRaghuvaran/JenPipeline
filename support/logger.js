const winston = require('winston');
require('winston-daily-rotate-file');

const { combine, timestamp, label, printf } = winston.format;
const CATEGORY = 'Playwright Logs';

//Using the printf format.
const customFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

// Creating Logger file
let fileRotateTransport = new winston.transports.DailyRotateFile({
  //Setting the filename
  filename: 'logs/WSMS-%DATE%.log',
  //Date pattern for file name its using moment.js
  datePattern: 'YYYY-MM-DD-HH',
  //Maximum 30 days the file will be stored
  maxFiles: '30d',
  level: 'info',
  //Maxmim size of single file is 10MB
  maxsize: '10M', // 5MB
  colorize: true,
});

let options = {
  format: combine(label({ label: CATEGORY }), timestamp(), customFormat),
  transports: [
    // Creating logs in console
    new winston.transports.Console({
      level: 'info',
      colorize: false,
    }),
    fileRotateTransport,
  ],
};
const logger = winston.createLogger(options);

module.exports = logger;
