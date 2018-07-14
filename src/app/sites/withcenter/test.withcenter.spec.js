/// <reference types="Cypress" />
import { Chance } from 'chance';
import { config } from '../../../../cypress';
const chance = new Chance();
context('Actions', () => {
    before(() => {})
    after(() => {})
    beforeEach(() => {
    })
    afterEach(() => {})
    describe('Withcenter Franchise Site Test', () => {
        it('withcenter page open', () => {
            cy.visit( config.url.withcenter )
            cy.get('#company-info');
        })
        it('Creating a branch', () => {
            cy.get("[name='user_email']").type( chance.email() );
            cy.get("[name='user_pass']").type( chance.email() );
            cy.get("[name='name']").type( chance.name() );
            cy.get("[name='phone_number']").type( chance.phone() );
            cy.get("[name='sub_domain']").type( chance.string({ length: 5, pool: 'abcdefg'}) );
            cy.get("[name='agree']").check();
            cy.get(".submit-button").click();
            cy.get(".dialog-content");
        });
    })
})
