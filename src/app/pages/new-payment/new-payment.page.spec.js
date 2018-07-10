/// <reference types="Cypress" />
import { Chance } from 'chance';
const chance = new Chance();

const email = chance.email();
const password = 'my-password-123a'
const kakaotalk_id = 'mykatalkid123a'

const paymentUrl = '/payment';
context('Payment', () => {
    before(() => {})
    after(() => {})
    beforeEach(() => {})
    afterEach(() => {})
    describe('Payment page test without login', () => {
        it('openning payment page', () => {
            cy.visit( paymentUrl )
            cy.get(".login-first")
        })
    })
    describe('Payment page test with login', () => {
        it('login', () => {
            cy.get('#desktop-header').find('.login').click();
            cy.get("[name='email']").type('thruthesky@naver.com');
            cy.get("[name='password']").type('asdf99');
            cy.get("[type='submit']").click();
        })
        it('opening payment page', () => {
            cy.get('#desktop-header').find('.payment').click();
        })
        it('selecting korean bank', () => {
            cy.get('#a100000').check();
            cy.get('.select-payment-method').find('.bank').click();
            // cy.get('.select-bank').find('.korea').click();
            cy.get("[data-bank-country='korea']");
        })
        it('cancel bank and select paypal payment', () => {
            cy.get('.change-point').first().click();
            cy.get('#a100000').check();
            cy.get('.select-payment-method').find('.paypal').click();
            cy.get('.paypal-payment-amount-description');
        })
    })

})