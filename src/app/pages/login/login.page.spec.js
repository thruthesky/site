/// <reference types="Cypress" />
const url = 'http://katalkenglish.org:4200/';
context('Actions', () => {
    before(() => {})
    after(() => {})
    beforeEach(() => {})
    afterEach(() => {})
    describe('Login Test', () => {
        it('openning login page', () => {
            cy.visit(url + 'login')
            cy.get('login-page').find('form').find("[name='email']")
        })
        it('login test', () => {
            cy.get("[name='email']").type('hello');
        })
    })
})