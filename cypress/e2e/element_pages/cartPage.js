export class cartPage {
    list_item(){
        return cy.get(".cart_item");
    };
    btn_checkout(){
        return cy.get(".btn_action");
    }

    //information page
    first_name(firstName){
        return cy.get("#first-name").type(firstName);
    };
    last_name(lastName){
        return cy.get("#last-name").type(lastName);
    };
    zip(zip){
        return cy.get("#postal-code").type(zip);
    };
    btn_continue(){
        return cy.get(".btn_primary").click();
    };
    text_error(){
        return cy.get('[data-test="error"]');
    };

    //overview
    item_total(){
        return cy.get('.summary_subtotal_label');
    };
    tax(){
        return cy.get('.summary_tax_label');
    };
    total(){
        return cy.get('.summary_total_label');
    };
    btn_finish(){
        return cy.get('.btn_action').click();
    };

    //complete order
    header_success(){
        return cy.get('.complete-header').should('be.visible');
    };
};