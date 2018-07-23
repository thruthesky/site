/// <reference types="Cypress" />
import {
    config
} from "../../../../cypress";
describe('My page', () => {
    it('Open my page', () => {
        cy.login( config.url.katalkenglish );
    })
})