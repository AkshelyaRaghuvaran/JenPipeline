module.exports = {
  TestDatasupportRequest: {
    primaryContact: 'Customer',
    preferredContactMethod: 'Phone',
    reqType: 'Parts & Service',
    source: 'Phone',
    serviceType: 'Warranty',
    concernType: 'Attached Incorrectly',
    preferredTime: 'Morning',
    siteType: 'Virtual',
    reason: 'Concern Reported During Warranty Period',
    partOrder:'Create Part Order',
    resolutionType: 'Resolved',
  },

  TestDataImport: {
    entityType: 'Business Entity',
    mappingType: 'LazBoy Channel Partner Service V6', //Lazboy Customer Business Entity Service V6
    delimiter: 'Pipe(|)',
    importSource: 'File',
    importFormat: 'CSV',
  },

  TestDataregistrationPage: {
    CustomerType: 'Customer',
    Reject: 'Reject',
    Transfer:'Transfer',
    Reopen:'Re-Open',
    date: '11-06-2024'
  },
  TestDataProduct360Page: {
    Create: 'Product Registration',
  },
};
