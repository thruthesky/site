/// <reference types="Cypress" />
import {
    config
} from "../../../../../../cypress";
describe('Not found page', () => {
    it('Open not found page', () => {
        cy.open( 'curriculum-page', 'curriculum-page', config.url.katalkenglish );
    })
})