import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import { loginPage } from "../element_pages/loginPage";
import { homePage } from "../element_pages/homePage";
import { cartPage } from "../element_pages/cartPage";

const login_page = new loginPage;
const home_page = new homePage;
const cart_page = new cartPage;

Given('User has login as {string}', (name) => {
    cy.visit('https://www.saucedemo.com/v1/index.html');
    cy.get(login_page.field_username).type(name);
    cy.get(login_page.field_password).type('secret_sauce');
    cy.get(login_page.btn_login).click();
});

//------------------------------ When -----------------------
When('User adds to cart an item products', () => {
    home_page.btn_addToCart().eq(0).click();
});

When('User adds to cart > 1 products', () => {
    home_page.btn_addToCart().eq(0).click();
    home_page.btn_addToCart().eq(1).click();
});

When('User selects product with stock out on Products page', () => {
    cy.stub();
});

//------------------------------ And ------------------------
And('User goes to cart page', () => {
    home_page.icon_cart().click()
    cy.url().should('contain', '/cart.html');
});

And('User sees list of products in cart page', () => {
    cart_page.list_item().should('be.visible');
});

And('User clicks a Checkout button', () => {
    cart_page.btn_checkout().click();
});

And('User submits form information with valid data', (table) => {
    table.hashes().forEach(row => {
        cart_page.first_name(row.first_name);
        cart_page.last_name(row.last_name);
        cart_page.zip(row.zip);
    });
    cart_page.btn_continue();
});

And('User can sees overview', () => {
    cart_page.list_item().should('be.visible');
    cart_page.item_total().should('be.visible');
    cart_page.tax().should('be.visible');
    cart_page.total().should('be.visible');
});

And('User clicks Finish button', () => {
    cart_page.btn_finish();
});

And('User should sees completed checkout page', () => {
    cart_page.header_success();
});

And('User has not add item to cart', () => {
    cy.stub();
});

And('User should sees text {string} in products view', (text) => {
    home_page.list_product().should('have.text', text)
});

And('User submits form information without input data', () => {
    cart_page.btn_continue();
});

And('User submits form information without input First Name', (table) => {
    table.hashes().forEach(row => {
        cart_page.last_name(row.last_name);
        cart_page.zip(row.zip);
    });
    cart_page.btn_continue();
})

And('User submits form information without input Last Name', (table) => {
    table.hashes().forEach(row => {
        cart_page.first_name(row.first_name);
        cart_page.zip(row.zip);
    });
    cart_page.btn_continue();
})

And('User submits form information without input Zip', (table) => {
    table.hashes().forEach(row => {
        cart_page.first_name(row.first_name);
        cart_page.last_name(row.last_name);
    });
    cart_page.btn_continue();
})

And('User submits form information with input text in Zip', (table) => {
    table.hashes().forEach(row => {
        cart_page.first_name(row.first_name);
        cart_page.last_name(row.last_name);
        cart_page.zip(row.zip);
    });
    cart_page.btn_continue();
})

And('User submits form information with input symbol and number in First Name', (table) => {
    table.hashes().forEach(row => {
        cart_page.first_name(row.first_name);
        cart_page.last_name(row.last_name);
        cart_page.zip(row.zip);
    });
    cart_page.btn_continue();
})

And('User submits form information with input symbol and number in Last Name', (table) => {
    table.hashes().forEach(row => {
        cart_page.first_name(row.first_name);
        cart_page.last_name(row.last_name);
        cart_page.zip(row.zip);
    });
    cart_page.btn_continue();
})

And('User submits form information with input < 3 digits in Zip', (table) => {
    table.hashes().forEach(row => {
        cart_page.first_name(row.first_name);
        cart_page.last_name(row.last_name);
        cart_page.zip(row.zip);
    });
    cart_page.btn_continue();
})

//------------------------------ Then ------------------------
Then('User successfully checkouts items', () => {
    cy.url().should('contain', '/checkout-complete.html');
});

Then('User should sees Checkout button is disabled', () => {
    cart_page.btn_checkout().should('be.disabled');
});

Then('User should sees Add to cart button is disabled', () => {
    home_page.btn_addToCart().eq(3).should('be.disabled')
});

Then('User should sees error text on field information {string}', (msg) => {
    cart_page.text_error().should('have.text', msg)
})