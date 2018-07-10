/// <reference types="Cypress" />
context('Actions', () => {
    before(() => {})
    after(() => {})
    beforeEach(() => {
    })
    afterEach(() => {})
    describe('KatalkEnglish Test', () => {
        it('Katalk homepage open', () => {
            cy.visit( '/' )
            cy.get('#katalkenglish').find('header');
        })
        it('Help Page', () => {
            cy.visit( '/' + 'help' );
            cy.get('#katalkenglish');
            cy.get('#katalkenglish').find('header');
            cy.get('#katalkenglish').find('header').find('h1');
        });
    })
})
