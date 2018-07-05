/// <reference types="Cypress" />
import { Chance } from 'chance';
const chance = new Chance();

const email = chance.email();
const password = 'my-password-123a'
const kakaotalk_id = 'mykatalkid123a'

const url = 'http://katalkenglish.org:4200/';
context('Actions', () => {
    before(() => {})
    after(() => {})
    beforeEach(() => {})
    afterEach(() => {})
    describe('Register Test', () => {
        it('openning register page', () => {
            cy.visit(url + 'register')
            cy.get('app-component-register').find('form').find("[name='email']")
        })
        it('register test', () => {
            cy.get("[name='email']").type(email);
            cy.get("[name='password']").type(password);
            cy.get("[name='name']").type( chance.name() );
            cy.get("[name='display_name']").type( chance.name() );
            cy.get("[name='phone_number'").type( chance.phone() );
            cy.get("[name='kakaotalk_id']").type( kakaotalk_id );
            cy.get("[name='agree']").check();
            cy.get("[type='submit']").click();
            cy.get(".try");
        })
    })
    describe('Login Test', () => {
        it('open login page', () => {
            cy.visit( url + 'login' )
            cy.get("[name='email']").type(email);
            cy.get("[name='password']").type(password);
            cy.get("[type='submit']").click();
            cy.get('.session-past');
            cy.visit( url + 'register' );
            cy.get('.profile-title');
        })
    })
})