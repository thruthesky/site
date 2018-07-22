/// <reference types="Cypress" />
import {
    config
} from "../../../../../../cypress";
describe('Not found page', () => {
    it('Open not found page', () => {
        cy.login( config.url.katalkenglish );
        cy.open(  'my-point-page', 'my-point-page' );
    })
})