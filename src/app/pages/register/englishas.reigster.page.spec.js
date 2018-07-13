/// <reference types="Cypress" />
import {
    Chance
} from 'chance';
const chance = new Chance();


const url = '/';
context('Actions', () => {
    before(() => {})
    after(() => {})
    beforeEach(() => {})
    afterEach(() => {})
    describe('Register Test', () => {
        it('openning register page', () => {
            cy.visit('/');
            // cy.visit(url + 'register')
            cy.get('#desktop-header').find('.register').click();
            cy.get('app-component-register').find('form').find("[name='email']")
        })
        it('register test', () => {
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
    // describe('Logout', () => {
    //     it('logout', () => {
    //         cy.get('#desktop-header').find('.menu').click();
    //         cy.get('.menu-logout').click();
    //     })
    // })
    // describe('Login Test', () => {
    //     it('open login page', () => {
    //         cy.get('#desktop-header').find('.login').click();
    //         cy.get("[name='email']").type(email);
    //         cy.get("[name='password']").type(password);
    //         cy.get("[type='submit']").click();
    //         cy.get('.session-past');
    //     })
    // })


    describe('Register with Skype', () => {
        it('logout', () => {
            cy.get('#desktop-header').find('.menu').click();
            cy.get('.menu-logout').click();
        })
        it('register test', () => {
            cy.get('#desktop-header').find('.register').click();
            cy.get('app-component-register').find('form').find("[name='email']");
            cy.get("[name='name']").type(chance.name());
            cy.get("[name='display_name']").type(chance.name());
            cy.get("[name='email']").type(chance.email());
            cy.get("[name='password']").type(chance.string({
                length: 8
            }));
            cy.get("[name='phone_number'").type(chance.phone());
            cy.get('.update-class-software-button').click();
            cy.get('.radio-skype').check();
            cy.get("[name='class_software_id']").type(chance.string({
                length: 8,
                pool: 'abcdefgh1324'
            }));
            cy.get("[name='agree']").check();
            cy.get("[type='submit']").click();
            cy.get(".try");
        })
    })


    describe('Profile page', () => {
        it('open profile page', () => {
            cy.get('#desktop-header').find('.menu').click();
            cy.get('.menu-profile').click();
        })
        it('edit messenger to skype', () => {
            cy.get('.update-class-software-button').click();
            cy.get('.radio-skype').check();
            cy.get("[name='class_software_id']").type(chance.string({
                length: 5,
                pool: 'abcdefgh'
            }))
            cy.get('.submit-button').click();
            cy.get('.desc-input-skype-id');
        })
        it('edit messenger to kakaotalk', () => {
            cy.get('.update-class-software-button').click();
            cy.get('.radio-kakaotalk').check();
            cy.get("[name='class_software_id']").type(chance.string({
                length: 5,
                pool: 'abcdefgh'
            }))
            cy.get('.submit-button').click();
            cy.get('.desc-input-kakaotalk-id');
        })
        it('edit messenger to wechat', () => {
            cy.get('.update-class-software-button').click();
            cy.get('.radio-wechat').check();
            cy.get("[name='class_software_id']").type(chance.string({
                length: 5,
                pool: 'abcdefgh'
            }))
            cy.get('.submit-button').click();
            cy.get('.desc-input-wechat-id');
        })
        it('edit messenger to line', () => {
            cy.get('.update-class-software-button').click();
            cy.get('.radio-line').check();
            cy.get("[name='class_software_id']").type(chance.string({
                length: 5,
                pool: 'abcdefgh'
            }))
            cy.get('.submit-button').click();
            cy.get('.desc-input-line-id');
        })
        it('edit messenger to qq', () => {
            cy.get('.update-class-software-button').click();
            cy.get('.radio-qq').check();
            cy.get("[name='class_software_id']").type(chance.string({
                length: 5,
                pool: 'abcdefgh'
            }))
            cy.get('.submit-button').click();
            cy.get('.desc-input-qq-id');
        })
    })
})