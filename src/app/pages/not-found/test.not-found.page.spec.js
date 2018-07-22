/// <reference types="Cypress" />
import {
    config
} from "../../../../cypress";
describe('Not found page', () => {
    it('Open not found page', () => {
        if ( config.server == 'remote' ) {
            return;
        }
        cy.visit( config.url.katalkenglish + '/not-found-oo' );
        cy.get("[data-role='not-found-page']")
    })
})