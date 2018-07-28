/// <reference types="Cypress" />
import {
    config
} from "../../../../cypress";
describe('My page', () => {
    if ( config.server == 'remote' ) {
        return;
    }
    before(() => {
        cy.login( config.url.katalkenglish );
    })
    it('Open my page', () => {
        cy.get("[data-role='my-page-page']");
        cy.get("[data-role='user-name']").should('contain', 'Teser');
        cy.get("[data-role='user-point']").should('contain', '0');
        cy.get("[data-role='user-level']").should('contain', '0');
    })
    it('Edit greeting', () => {
        
        cy.get("[name='greeting']").clear({ timeout: 1000 }).type("Hello there. I am Jae. I am learning English.");
        cy.get("[data-button='greeting-update']").click();
        cy.get("[data-class='greeting-saved']");

    })
    it('Auction test', () => {
        cy.get("[data-button='open-auction-box']").click();
        cy.get("[name='sunday']").check({timeout: 1000});
        cy.get("[name='monday']").check({timeout: 1000});
        cy.get("[name='tuesday']").check({timeout: 1000});
        cy.get("[name='wednesday']").check({timeout: 1000});
        cy.get("[name='thursday']").check({timeout: 1000});
        cy.get("[name='friday']").check({timeout: 1000});
        cy.get("[name='saturday']").check({timeout: 1000});
        
        // cy.get("[name='hour']").select('01', { timeout: 1000 });
        cy.get("[name='hour']").click();
        cy.get(".mat-option-text").first().click();

        cy.get("[name='minute']").click();
        
        cy.get(".mat-option-text").eq(27).click();
        cy.get("[name='duration']").click();
        cy.get("[data-min='25'] .mat-option-text").click();
        cy.get("[name='point']").click();
        cy.get("[data-price]").first().find(".mat-option-text").click();

        cy.get("[name='comment']").type("I am looking for a male teacher who can teach me IELTS on skype.");
        cy.get("[data-button='auction-update']").click();
        cy.get("[data-class='auction-saved']");

        cy.get("[data-button='auction-delete']").click();
        cy.get("[data-button='open-auction-box']").click();
        cy.get("[name='comment']").should('be.empty');
    })
})