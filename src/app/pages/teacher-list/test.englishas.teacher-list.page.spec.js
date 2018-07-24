/// <reference types="Cypress" />

import {
    config,
    MESSENGERS
} from "../../../../cypress";
import {
    Chance
} from 'chance';
const chance = new Chance();
const teacherName = 'Laira'


for (const messenger of MESSENGERS) {
    if ( config.server == 'remote' ) {
        break;
    }
    describe('Teacher list. Schedule Table. Messenger change test: ' + messenger, () => {
        beforeEach(() => {
            cy.login(config.url.englishas)
        })
        afterEach(() => {
            // cy.logout();
        })
        it('Change messenger to ' + messenger, () => {
            cy.open('profile', 'register-page')
            cy.get("[data-role='choose-another-messenger-app']").click();
            cy.get('.radio-' + messenger).check({timeout: 1000})
            // cy.wait(100);
            cy.get("[data-input-id-for='" + messenger + "']")
            cy.get("[name='class_software_id']").clear({ timeout: 1000 });
            cy.get("[name='class_software_id']").type(chance.string({
                length: 5,
                pool: 'abcdefgh'
            }))
            cy.get('.submit-button').click();
            cy.get("[data-input-id-for='" + messenger + "']")
            // cy.get('.desc-input-' + messenger + '-id');
            cy.get("[data-role='profile-update-indicator']")

            cy.open('teacher-list', 'teacher-list-page');
            cy.get("[data-button='teacher-list-search']").click();
            cy.get("[name='name']").type(teacherName);
            cy.get("[data-teacher-name='" + teacherName + "']");

            cy.get("[data-button='teacher']").should('have.length', 1);
            cy.get("[data-button='teacher']").click();
            cy.get("[data-role='schedule-table-page']");
            // cy.wait(500);
            cy.get("[data-class-software='" + messenger + "']")
        })
    })
}