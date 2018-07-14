/// <reference types="Cypress" />

import {
    config
} from "../../../../cypress";

context('Actions', () => {
    describe('EnglishAs Login Test', () => {
        it('login test', () => {
            cy.login( config.url.englishas );
        })
    })
})