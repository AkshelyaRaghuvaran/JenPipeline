Feature: Import File

  @ImportFile @Demo
  Scenario: Verify the functionality of ALI Import
    Given User is on the login page
    When Login with "<userName>" and "<passWord>"
    # Then Select Go To menu
    # Then Navigate to the CX Connect
    And Select Import option from ImportExport menu
    Then Get the latest Import ID
    Then Select New to import the data
    Then Fill in the details in Import Tab
    Then Browse and upload the file
    Then Import the file
    Then Validate that Import is successful
    Then View the logs
    Then User should should select the desired Import log
    Then Verify the details in the Import Log
    Then Navigate to Record Data Tab
    Then Select the Entity and Verify the details of the import

    Examples:
      | userName      | passWord |
      | TestSuperUser | Abcd1234 |
