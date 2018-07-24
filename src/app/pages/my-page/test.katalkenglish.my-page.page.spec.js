/// <reference types="Cypress" />
import {
    config
} from "../../../../cypress";
describe('My page', () => {
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
        cy.get(".greeting-saved");

    })
    it('Auction box test', () => {
        cy.get("[data-button='open-auction-box']").click();
    })
})