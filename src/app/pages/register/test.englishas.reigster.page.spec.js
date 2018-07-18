/// <reference types="Cypress" />
import {
    Chance
} from 'chance';
import {
    config
} from '../../../../cypress';
const chance = new Chance();



const messengers = ['skype', 'kakaotalk', 'wechat', 'line', 'qq'];
const url = config.url.englishas;
console.log('url: ', url);
context('EnglishAs Register', () => {
    before(() => {
        // cy.login(config.url.englishas);
        cy.visit(config.url.englishas)
    })
    after(() => {})
    beforeEach(() => {})
    afterEach(() => {})
    describe('EngliashAs Register Test', () => {
        it('openning register page', () => {
            cy.get('#desktop-header').find('.register').click();
            cy.get('app-component-register').find('form').find("[name='email']")
        })
        it('EnglishAs register test', () => {
            cy.get("[name='name']").type(chance.name());
            cy.get("[name='display_name']").type(chance.name());
            cy.get("[name='email']").type(chance.email());
            cy.get("[name='password']").type(chance.string({
                length: 8
            }));
            cy.get("[name='phone_number'").type(chance.phone());
            cy.get("[name='class_software_id']").type(chance.string({
                length: 8,
                pool: 'abcdefgh1324'
            }));
            cy.get("[name='agree']").check();
            cy.get("[type='submit']").click();
            cy.get(".try");
        })
    })

    for (const messenger of messengers) {
        describe('EnglishAs register with: ' + messenger, () => {
            it('logout', () => {
                cy.get('#desktop-header').find('.menu').click();
                cy.get('.menu-logout').click();
            })
            it('register with ' + messenger, () => {
                cy.get('#desktop-header').find('.register').click();
                cy.get('app-component-register').find('form').find("[name='email']");
                cy.get("[name='name']").type(chance.name());
                cy.get("[name='display_name']").type(chance.name());
                cy.get("[name='email']").type(chance.email());
                cy.get("[name='password']").type(chance.string({
                    length: 8
                }));
                cy.get("[name='phone_number'").type(chance.phone());
                cy.get("[data-role='choose-another-messenger-app']").click();
                cy.get('.radio-' + messenger).check();
                cy.get("[data-input-id-for='" + messenger + "']")
                cy.get("[name='class_software_id']").type(chance.string({
                    length: 8,
                    pool: 'abcdefgh1324'
                }));
                cy.get("[name='agree']").check();
                cy.get("[type='submit']").click();
                cy.get(".try");
            })
            it('check if ' + messenger + ' has been properly set', () => {
                cy.get('#desktop-header').find('.menu').click();
                cy.get('.menu-profile').click();
                cy.get("[data-input-id-for='" + messenger + "']")
            })
        })
    }


    for (const messenger of messengers) {
        describe('Update user profile test: ' + messenger, () => {
            it('open profile page', () => {
                cy.get('#desktop-header').find('.menu').click();
                cy.get('.menu-profile').click();
            })
            it('edit messenger to ' + messenger, () => {
                cy.get("[data-role='choose-another-messenger-app']").click();
                cy.get('.radio-' + messenger).check();
                const id = "[name='class_software_id']";
                cy.get(id).should('be.empty');
                cy.get(id).type(chance.string({
                    length: 5,
                    pool: 'abcdefgh'
                }))
                cy.get('.submit-button').click();
                cy.get("[data-input-id-for='" + messenger + "']")
            })
        })
    }
})