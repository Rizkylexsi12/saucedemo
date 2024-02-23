Feature: Products 
Background:
  Given User has login as 'standard_user'

@positive
Scenario: [TCP-PRO-001] User wants to see all items of product
    When User clicks All items menu on sidebar
    Then User should sees all items of product

@positive
Scenario: [TCP-PRO-002] User wants to see detail product
    When User clicks name of product on products page
    Then User should sees detail of product 

@positive
Scenario: [TCP-PRO-003] User sorts list of product
    When User selects Price low to high on option of sorting icon
    Then User should sees product has sorted by Price low to high