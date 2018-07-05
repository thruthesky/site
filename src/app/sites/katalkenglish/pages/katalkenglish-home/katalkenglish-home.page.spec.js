/// <reference types="Cypress" />
const url = 'http://katalkenglish.org:4200/';
context('Actions', () => {
    before(() => {})
    after(() => {})
    beforeEach(() => {
    })
    afterEach(() => {})
    describe('KatalkEnglish Test', () => {
        it('Katalk homepage open', () => {
            cy.visit( url )
            cy.get('#katalkenglish').find('header');
        })
        it('Help Page', () => {
            cy.visit( url + 'help' );
            cy.get('#katalkenglish');
            cy.get('#katalkenglish').find('header');
            cy.get('#katalkenglish').find('header').find('h1');
        });
    })
})
