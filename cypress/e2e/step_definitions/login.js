import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import { loginPage } from "../element_pages/loginPage";

const login_page = new loginPage;
const baseurl = 'https://www.saucedemo.com/v1';

Given('User on Login Page', () => {
  cy.visit(baseurl, '/index.html')
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
  cy.url().should('include', baseurl + '/inventory.html')
})

//----------------------------------- Then -------------------------------
Then(`User successfully Logs in`, () => {
  cy.get('.product_label').should('contain', 'Products')
})

Then('User should sees toast alert Login failed {string}', (message) => {
  cy.get('[data-test="error"]').should('contain', message)
})