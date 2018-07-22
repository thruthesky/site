/// <reference types="Cypress" />
import {
    config
} from "../../../../cypress";
describe('Message page', () => {
    it('Open message', () => {
        cy.login( config.url.katalkenglish );
        cy.open( 'message-page', 'message-page' );
        cy.get("[data-button='inbox']")
    })
    it('Click sent box', () => {
        cy.get("[data-button='sentbox']").click()
    })
})