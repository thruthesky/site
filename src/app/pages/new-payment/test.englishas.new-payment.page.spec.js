/// <reference types="Cypress" />
import {
    config
} from '../../../../cypress';

context('Payment', () => {
    before(() => {
        cy.login(config.url.englishas);
    })
    describe('EnglishAs  payment page test with login', () => {
        it('open payment page', () => {
            cy.get("[data-button='desktop-payment']").click();
        })

        const countries = ['korea', 'china', 'japan'];

        for (const country of countries) {
            it('EnglishAs select amount for ' + country, () => {
                cy.get('#a100000').check();
            })
            it('EnglishAs select bank', () => {
                cy.get("[data-button='bank']").click();
            })

            it('EnglishAs select bank ' + country, () => {
                cy.get("[data-button='country-" + country + "']").click();
                cy.get("[data-role='" + country + "Bank']")
            })

            it('EnglishAs cancel bank', () => {
                cy.get('.change-point').first().click();
            })
        }

        it('EnglishAs select paypal payment', () => {
            cy.get('#a100000').check();
            cy.get('.select-payment-method').find('.paypal').click();
            cy.get('.paypal-payment-amount-description');
        })
    })

})