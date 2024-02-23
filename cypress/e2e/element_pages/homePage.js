export class homePage {
    logo(){
        return cy.get(".app_logo");
    };
    btn_sideBar(){
        return cy.get(".bm-burger-button > button");
    };
    icon_cart(){
        return cy.get("#shopping_cart_container");
    };
    icon_sortir(){
        return cy.get(".product_sort_container");
    };
    list_product(){
        return cy.get(".inventory_item")
    };
    name_product(){
        return cy.get(".inventory_item_name");
    };
    price_product(){
        return cy.get(".inventory_item_price");
    }; 
    btn_addToCart(){
        return cy.get(".pricebar > .btn_primary");
    };
};