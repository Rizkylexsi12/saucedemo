import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import { loginPage } from "../element_pages/loginPage";
import { homePage } from "../element_pages/homePage";

const login_page = new loginPage;
const home_page = new homePage;

Given('User on Login Page', () => {
  cy.visit('/index.html')
})

//---------------------- When ---------------------------
When('User inputs valid username and valid password', (table) => {
  table.hashes().forEach(row => {
    cy.get(login_page.field_username).type(row.username)
    cy.get(login_page.field_password).type(row.password)
  });
})

When('User inputs incorrect username and inputs password', (table) => {
  table.hashes().forEach(row => {
    cy.get(login_page.field_username).type(row.username)
    cy.get(login_page.field_password).type(row.password)
  });
})

When('User inputs valid username and inputs incorrect password', (table) => {
  table.hashes().forEach(row => {
    cy.get(login_page.field_username).type(row.username)
    cy.get(login_page.field_password).type(row.password)
  });
})

When('User inputs password without input username', (table) => {
  table.hashes().forEach(row => {
    cy.get(login_page.field_password).type(row.password)
  });
})

When('User inputs valid username without input password', (table) => {
  table.hashes().forEach(row => {
    cy.get(login_page.field_username).type(row.username)
  });
})

//------------------------------- And ----------------------------------
And("User inputs password", () => {
  cy.get(login_page.field_password).type(password)
})

And('User clicks a Login button', () => {
  cy.get(login_page.btn_login).click()
})

And('User is directed to products page', () => {
  cy.url().should('include', '/inventory.html')
})

//----------------------------------- Then -------------------------------
Then(`User successfully Logs in`, () => {
  cy.get('.product_label').should('contain', 'hoho')
  cy.get(home_page.logo).should('be.visible')
})

Then('User should sees toast alert Login failed {string}', (message) => {
  cy.get('[data-test="error"]').should('contain', message)
})