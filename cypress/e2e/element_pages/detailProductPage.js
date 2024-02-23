export class detailProductPage {
    name_product(){
        return cy.get(".inventory_details_name");
    };
    price_product(){
        return cy.get(".inventory_details_price");
    };
    img_product(){
        return cy.get(".inventory_details_img");
    };
};