/// <reference types="Cypress" />

import {
    config
} from "../../../../cypress";

context('Actions', () => {
    describe('KatalkEnglish Login Test', () => {
        it('login test', () => {
            cy.login( config.url.katalkenglish );
        })
    })
})