/// <reference types="Cypress" />
import {
    config
} from '../../../../cypress';

context('KatalkEnglish Payment', () => {
    before(() => {
        cy.login( config.url.katalkenglish );
    })

    describe('KatalkEnglish payment page', () => {
        it('KatalkEnglish open payment page', () => {
            cy.get("[data-button='desktop-payment']").click();
        })
        it('KatalkEnglish select amount', () => {
            cy.get('#a100000').check();
        })
        it('KatalkEnglish select bank', () => {
            cy.get("[data-button='bank']").click();
            cy.get("[data-role='koreaBank']")
        })
        it('KatalkEnglish cancel bank', () => {
            cy.get('.change-point').first().click();
        })
        it('KatalkEnglish select paypal payment', () => {
            cy.get('#a100000').check();
            cy.get('.select-payment-method').find('.paypal').click();
            cy.get('.paypal-payment-amount-description');
        })
    })

})