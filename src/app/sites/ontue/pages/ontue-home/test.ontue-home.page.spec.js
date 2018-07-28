/// <reference types="Cypress" />

import { config } from "../../../../../../cypress";

context('OnTue Home', () => {
    describe('OnTue homepage test', () => {
        it('open OnTue homepage', () => {
            // cy.login( config.url.ontue );
            cy.visit(config.url.ontue);
            cy.get("[data-button='login-page']").click();
            cy.get("[name='email']").type(config.testuser.email);
            cy.get("[name='password']").type(config.testuser.password);
            cy.get("[data-button='login']").click();
            cy.get("[data-role='ontue-home-page']");
        })
    })
})
