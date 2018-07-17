/// <reference types="Cypress" />

import {
    config
} from "../../../../cypress";
import {
    Chance
} from 'chance';
const chance = new Chance();
const teacherName = 'TAY3'

context('Schedule Table Page', () => {
    before(() => {
        cy.login(config.url.englishas)
    })
    describe('Reserve a session of teacher: ' + teacherName, () => {
        it('Open schedule table of teacher: ' + teacherName, () => {
            cy.open('teacher-list', 'teacher-list-page');
            cy.get("[data-button='teacher-list-search']").click();
            cy.get("[name='name']").type(teacherName);
            // cy.get("[data-teacher-name='" + teacherName + "']");
            cy.get("[data-button='teacher']").should('have.length', 1);
            cy.get("[data-button='teacher']").click();
            cy.get("[data-role='schedule-table-page']");
            /**
             * Select fture, open, no-prere class.
             */
            cy.get(".td.session[status='F'][open='O'][prere='']").first().click();
            cy.get("[owner='me']")
        })
    })
    describe('Cancel the reservations of teacher: ' + teacherName, () => {
        it("Cancel reservation", () => {
            // cy.wait(1000);
            cy.open('session-future', 'student-session-future-page');
            cy.get("[data-button='cancel-reservation']").first().click();
            cy.get("[data-button='yes']").click();
            cy.get("[data-button='cancel-reservation']").should('not.exist');
        })
    });
})