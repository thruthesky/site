/// <reference types="Cypress" />

import {
    config
} from "../../../../cypress";


describe('Ontue Login Test', () => {
    it('login test', () => {
        cy.visit(config.url.ontue);
        cy.get("[data-button='login-page']").click();
        cy.get("[name='email']").type(config.testuser.email);
        cy.get("[name='password']").type(config.testuser.password);
        cy.get("[data-button='login']").click();
        cy.get("[data-button='teacher-session-future-page']");
    })
})