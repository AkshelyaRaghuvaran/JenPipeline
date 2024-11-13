Feature: Create Support Request and Resolve it

  @SupportRequest @E2E @Demo
  Scenario: Support Request without Part Order
    Given User is on the login page
    When Login with "<userName>" and "<passWord>"
    Then Search for a customer with "<searchText>"
    Then Create a support request
    Then Update the request tab of support request
    And Update the products tab with necessary details
    And Update visits tab with necessary details
    And Update the labor tab with necessary details
    Then Save the support request and capture the ID and status
    Then Submit the Support Request and capture the status
    Then Resolve visits
    Then Resolve Service Request
    Then Resolve the Support Request and Verify the Status

    Examples:
      | userName | passWord | searchText     |
      | Testcer  | Abcd1234 | RMS_2044238041 |

  @SupportRequest @Orders @E2E @FailureCheck
  Scenario: Support Request with Part Ordert
    Given User is on the login page
    When Login with "<userName>" and "<passWord>"
    Then Search for a customer with "<searchText>"
    Then Create a support request
    Then Update the request tab of support request
    And Update the products tab with necessary details
    And Update visits tab with necessary details
    And Update the labor tab with necessary details
    Then Save the support request and capture the ID and status
    Then Submit the Support Request and capture the status
    Then Add a Part in Parts with "<part>" section and Check the order Checkbox
    Then Place the Part Order
    Then Verify the Summary Tab
    Then Select Customer Pay
    Then Verify the Customer Pay Tab
    Then Get the Payment Link
    And Proceed with the Payment
    Then Resolve visits
    Then Resolve Service Request
    Then Resolve the Support Request and Verify the Status

    Examples:
      | userName      | passWord | searchText     | part                        |
      | TestSuperUser | Abcd1234 | RMS_2044238041 | Test-syncron-SV003930-003R1 |
