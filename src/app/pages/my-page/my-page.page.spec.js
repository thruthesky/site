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
    })
})