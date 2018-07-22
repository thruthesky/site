/// <reference types="Cypress" />
import {
    config
} from "../../../../cypress";
describe('Forum page', () => {
    it('Open stuent reminders', () => {
        cy.open( 'reminder-page', 'forum-page', config.url.katalkenglish);
    })
})