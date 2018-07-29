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
        it("new student test", () => {
            cy.get("[data-role='new-student-name']").first().click();
            cy.get("[data-role='new-student-list-page']");
            cy.get("[data-button='send-message']").first().click();
            cy.get(".mat-dialog-title");
            cy.get("[name='message_content']").type("Hello, friend. How are you? I am JaeHo Song.");
            cy.get("[data-button='send']").click();
            cy.get(".mat-simple-snackbar");
        })
    })
})
