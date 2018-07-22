/// <reference types="Cypress" />
import {
    Chance
} from 'chance';
import {
    config
} from '../../../../cypress';
const chance = new Chance();
const kakaotalkId = chance.string({
    length: 8,
    pool: 'abcdefgh1324'
});
const url = config.url.katalkenglish;
console.log('url: ', url);
context('KatalkEnglish Register', () => {
    if (config.server == 'remote') {
        return;
    }
    before(() => {
        cy.visit(url)
    })
    after(() => {})
    beforeEach(() => {})
    afterEach(() => {})
    describe('KatalkEnglish Register Test', () => {

        it('openning register page', () => {
            cy.open('register', 'register-page');
        })
        it('KatalkEnglish register test', () => {
            cy.get("[name='name']").type(chance.name());
            cy.get("[name='display_name']").type(chance.name());
            cy.get("[name='email']").type(chance.email());
            cy.get("[name='password']").type(chance.string({
                length: 8
            }));
            cy.get("[name='phone_number'").type(chance.phone());
            cy.get("[name='class_software_id']").type(kakaotalkId);
            cy.get("[name='agree']").check();
            cy.get("[type='submit']").click();
            cy.get(".try");
        })
    })

    describe('KatalkEnglish update user profile test', () => {
        it('open profile page', () => {
            cy.open('profile', 'register-page');
        })
        it('check kakaotalk id', () => {
            cy.get("[name='class_software_id']").should('have.value', kakaotalkId)
        })

    })
})