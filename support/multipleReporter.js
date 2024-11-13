const report = require('multiple-cucumber-html-reporter');

const now = new Date();
const executionStartTime = now.toLocaleString();

report.generate({
  jsonDir: './reports/cucumberReport',
  reportPath: './reports/cucumberReport',
  metadata: {
    browser: {
      name: 'chrome',
      version: '60',
    },
    device: 'Local test machine',
    platform: {
      name: 'ubuntu',
      version: '16.04',
    },
  },
  customData: {
    title: 'Run info',
    data: [
      { label: 'Project', value: 'WSMS Project' },
      { label: 'Release', value: 'RDC' },
      { label: 'Cycle', value: 'R1' },
      { label: 'Execution Start Time', value: executionStartTime },
      { label: 'Execution End Time', value: executionStartTime },
    ],
  },
});
