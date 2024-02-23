import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import { loginPage } from "../element_pages/loginPage";
import { homePage } from "../element_pages/homePage";
import { detailProductPage } from "../element_pages/detailProductPage";

const login_page = new loginPage;
const home_page = new homePage;
const detail_product_page = new detailProductPage;
let name_item, price_item;

Given('User has login as {string}', (name) => {
    cy.visit('https://www.saucedemo.com/v1/index.html')
    cy.get(login_page.field_username).type(name)
    cy.get(login_page.field_password).type('secret_sauce')
    cy.get(login_page.btn_login).click()
})

//------------------------------ When -----------------------
When('User clicks All items menu on sidebar', () => {
    home_page.btn_sideBar().click()
})

When('User clicks name of product on products page', () => {
    home_page.name_product().eq(0).invoke('text').then(text => {
        name_item = text;
    })
    home_page.price_product().eq(0).invoke('text').then(text => {
        price_item = text;
    })
    home_page.name_product().eq(0).click()
})

When('User selects Price low to high on option of sorting icon', () => {
    home_page.icon_sortir().select('Price (low to high)')
})

//------------------------------ Then ------------------------
Then('User should sees all items of product', () => {
    cy.url().should('contain', 'https://www.saucedemo.com/v1/inventory.html')
    home_page.list_product().should('be.visible')
})

Then('User should sees detail of product', () => {
    cy.url().should('contain', '/inventory-item.html')
    detail_product_page.name_product().invoke('text').should('eq', name_item)
    detail_product_page.price_product().invoke('text').should('eq', price_item)
    detail_product_page.img_product().should('be.visible')
})

Then('User should sees product has sorted by Price low to high', () => {
    home_page.price_product().then($elements => {
        const prices = $elements.map((index, element) => {
            const text = Cypress.$(element).text();
            return parseInt(text.split('$')[1].trim());
        }).toArray();

        for (let i = 0; i < 1; i++) {
            expect(prices[i]).to.be.lessThan(prices[i + 1]);
        }
    });
});