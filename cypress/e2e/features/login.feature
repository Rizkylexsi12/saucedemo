Feature: Login 
Background:
  Given User on Login Page
  
@positive
Scenario: [TCP-LOG-001] User logs in with valid credentials
  When User inputs valid username and valid password
  |username     |password     |
  |standard_user|secret_sauce |
  And User clicks a Login button
  Then User successfully Logs in
  And User is directed to products page

@positive
Scenario: [TCN-LOG-001] User logs in with incorrect Username
  When User inputs incorrect username and inputs password
  |username     |password     |
  |new_user     |secret_sauce |
  And User clicks a Login button
  Then User should sees toast alert Login failed "Username and password do not match any user in this service"

@negative
Scenario: [TCN-LOG-002] User logs in with incorrect password
  When User inputs valid username and inputs incorrect password
  |username     |password |
  |standard_user|Qwerty   |
  And User clicks a Login button
  Then User should sees toast alert Login failed "Username and password do not match any user in this service"

@negative
Scenario: [TCN-LOG-003] User logs in with empty Username
  When User inputs password without input username
  |password |
  |Qwerty   |
  And User clicks a Login button
  Then User should sees toast alert Login failed "Username is required"

@negative
Scenario: [TCN-LOG-004] User logs in with empty Password
  When User inputs valid username without input password
  |username       |
  |standard_user  |
  And User clicks a Login button
  Then User should sees toast alert Login failed "Password is required"