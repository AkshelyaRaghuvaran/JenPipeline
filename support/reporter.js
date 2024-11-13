const reporter = require('cucumber-html-reporter');

const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumberReport/web_report.json',
  output: 'reports/webReport/web_report.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
    'Test Type': 'Web',
  },
};

reporter.generate(options);
