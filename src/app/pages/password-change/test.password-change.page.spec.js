/// <reference types="Cypress" />
import {
    config
} from "../../../../cypress";
describe('Message page', () => {
    it('Open message', () => {
        cy.login( config.url.katalkenglish );
        cy.open( 'password-change-page', 'password-change-page' );
        cy.get("[name='old_password']").type('12345~a12345a');
        cy.get("[name='new_password']").type('12345a~12345a');
        cy.get("[data-button='password-change']").click();
        cy.get(".error-55030");
    })
})