Feature: Checkout 
Background:
  Given User has login as 'standard_user'

@positive
Scenario: [TCP-CHO-001] User checks out item product
    When User adds to cart an item products
    And User goes to cart page
    And User sees list of products in cart page
    And User clicks a Checkout button
    And User submits form information with valid data
    |first_name |last_name  |zip    |
    |Testing    |User       |1234   |
    And User can sees overview
    And User clicks Finish button
    Then User successfully checkouts items
    And User should sees completed checkout page

@positive
Scenario: [TCP-CHO-002] User checks out item with > 1 products
    When User adds to cart > 1 products
    And User goes to cart page
    And User sees list of products in cart page
    And User clicks a Checkout button
    And User submits form information with valid data
    |first_name |last_name  |zip    |
    |Testing    |User       |1234   |
    And User can sees overview
    And User clicks Finish button
    Then User successfully checkouts items
    And User should sees completed checkout page

@negative
Scenario: [TCN-CHO-001] User checks out in cart page with none products in it
    And User has not add item to cart
    When User goes to cart page
    Then User should sees Checkout button is disabled

@negative
Scenario: [TCN-CHO-002] User checks out items stock out
    When User selects product with stock out on Products page
    Then User should sees Add to cart button is disabled
    And User should sees text "Stock Out" in products view

@negative
Scenario: [TCN-CHO-003] User checks out without input form information
    When User adds to cart an item products
    And User goes to cart page
    And User sees list of products in cart page
    And User clicks a Checkout button
    And User submits form information without input data
    Then User should sees error text on field information "Please filled out all form"

@negative
Scenario: [TCN-CHO-004] User checks out without input First Name
    When User adds to cart an item products
    And User goes to cart page
    And User sees list of products in cart page
    And User clicks a Checkout button
    And User submits form information without input First Name
    |last_name  |zip    |
    |User       |1234   |
    Then User should sees error text on field information "Error: First Name is required"

@negative
Scenario: [TCN-CHO-005] User checks out without input Last Name
    When User adds to cart an item products
    And User goes to cart page
    And User sees list of products in cart page
    And User clicks a Checkout button
    And User submits form information without input Last Name
    |first_name |zip    |
    |Testing    |1234   |
    Then User should sees error text on field information "Error: Last Name is required"

@negative
Scenario: [TCN-CHO-006] User checks out without input Zip/Postal Code
    When User adds to cart an item products
    And User goes to cart page
    And User sees list of products in cart page
    And User clicks a Checkout button
    And User submits form information without input Zip
    |first_name |last_name   |
    |Testing    |User        |
    Then User should sees error text on field information "Error: Postal Code is required"

@negative
Scenario: [TCN-CHO-007] User checks out with input text in Zip/Postal Code
    When User adds to cart an item products
    And User goes to cart page
    And User sees list of products in cart page
    And User clicks a Checkout button
    And User submits form information with input text in Zip
    |first_name |last_name  |zip    |
    |Testing    |User       |test   |
    Then User should sees error text on field information "Error: Postal code must be filled in with numbers."

@negative
Scenario: [TCN-CHO-008] User checks out with input symbol and number in First Name
    When User adds to cart an item products
    And User goes to cart page
    And User sees list of products in cart page
    And User clicks a Checkout button
    And User submits form information with input symbol and number in First Name
    |first_name |last_name  |zip    |
    |$Testing123|User       |1234   |
    Then User should sees error text on field information "First Name must be filled in with letters."

@negative
Scenario: [TCN-CHO-009] User checks out with input symbol and number in Last Name
    When User adds to cart an item products
    And User goes to cart page
    And User sees list of products in cart page
    And User clicks a Checkout button
    And User submits form information with input symbol and number in Last Name
    |first_name |last_name  |zip    |
    |Testing    |$User1234  |1234   |
    Then User should sees error text on field information "Last Name must be filled in with letters."

@negative
Scenario: [TCN-CHO-010] User checks out with input < 3 digits
    When User adds to cart an item products
    And User goes to cart page
    And User sees list of products in cart page
    And User clicks a Checkout button
    And User submits form information with input < 3 digits in Zip
    |first_name |last_name  |zip    |
    |Testing    |User       |1      |
    Then User should sees error text on field information "Last Name must be filled in with letters."