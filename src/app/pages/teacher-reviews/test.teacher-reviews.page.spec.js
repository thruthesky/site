/// <reference types="Cypress" />
import {
    config
} from "../../../../cypress";
describe('Not found page', () => {
    it('Open not found page', () => {
        cy.open( 'class-comments-page', 'class-comments-page', config.url.katalkenglish );
    })
})