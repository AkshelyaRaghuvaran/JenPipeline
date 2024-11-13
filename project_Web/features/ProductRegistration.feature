Feature: Lazboy Application Login and Product Registration

  @Registration @Sanity @Demo
  Scenario: Product Registration
    Given User is on the login page
    When Login with "<userName>" and "<passWord>"
    Then Click on Registration SmartBlox from Home panel menu
    Then User should be landing on Product Registration Home page
    Then Click on new
    Then Update the registration tab with "<ali>"
    Then Update the Customer  tab with "<customer>"
    Then Update the warranty tab
    Then Click on save and register
    #Then Click on reject under more dropdown
    #Then Click on delete under more dropdown

    Examples:
      | userName      | passWord | ali                | customer      |
      | TestSuperUser | Abcd1234 | 2408081883-001-002 | RMS_205375801 |

  @Registration @E2E @Demo
  Scenario: Open Product 360 then Search for an unregistered ALI then Click Registration then Register the product
    Given User is on the login page
    When Login with "<userName>" and "<passWord>"
    Then Click on Products SmartBlox from Home panel menu
    Then Open Product360
    Then Enter  unregistered ALI and Style Number with "<ali>" and "<styleNumber>"
    Then Click on search
    Then Select product registeration under create drop down
    Then Update the Customer  tab with "<customer>"
    Then Update the warranty tab
    Then Click on save and register

    Examples:
      | userName | passWord | ali                | styleNumber | customer       |
      | TestCer  | Abcd1234 | 2407171096-008-001 | U4B.0724    | RMS_1138070041 |

 @Reopen
  Scenario: Product Registration
    Given User is on the login page
    When Login with "<userName>" and "<passWord>"
    Then Click on Registration SmartBlox from Home panel menu
    Then User should be landing on Product Registration Home page
    Then Click on new
    Then Update the registration tab with "<ali>"
    Then Update the Customer  tab with "<customer>"
    Then Update the warranty tab
    Then Click on save and register
    Then Click on Reopen under more dropdown

    Examples:
      | userName      | passWord | ali                | customer      |
      | TestSuperUser | Abcd1234 | 2405300508-050-002 | RMS_205375801 |
