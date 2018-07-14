/// <reference types="Cypress" />
import {
    Chance
} from 'chance';
import {
    config
} from '../../../../cypress';
const chance = new Chance();
const skypeId = 'skyeid';
const kakaotalkId = 'kakaotalkid';
const wechatId = 'wechatid';
const lineId = 'lineid';
const qqId = 'qqid';
context('OnTue Register', () => {
    before(() => {
        cy.visit(config.url.ontue)
    })
    after(() => {})
    beforeEach(() => {})
    afterEach(() => {})
    describe('OnTue Register Test', () => {

        it('OnTue open register page', () => {
            cy.open('register', 'register-page');
        })
        it('OnTue register test', () => {
            cy.get("[name='name']").type(chance.name());
            cy.get("[name='display_name']").type(chance.name());
            cy.get("[name='email']").type(chance.email());
            cy.get("[name='password']").type(chance.string({
                length: 8
            }));
            cy.get("[name='bookable_time'").type(15);
            cy.get("[name='phone_number'").type(chance.phone());
            cy.get("[name='skype']").type(skypeId);
            cy.get("[name='kakaotalk']").type(kakaotalkId);
            cy.get("[name='wechat']").type(wechatId);
            cy.get("[name='line']").type(lineId);
            cy.get("[name='qq']").type(qqId);
            cy.get("[name='month']").select("02");
            cy.get("[name='day']").select("03");
            cy.get("[name='year']").select("1984");
            cy.get("[name='agree']").check();
            cy.get("[type='submit']").click();
            cy.get("[data-role='profile-title']")
        })
    })

    describe('OnTue update user profile test', () => {
        it('open profile page', () => {
            cy.open('register', 'register-page');
        })
        it('check messenger id', () => {
            cy.get("[name='skype']").should('have.value', skypeId)
            cy.get("[name='kakaotalk']").should('have.value', kakaotalkId)
            cy.get("[name='wechat']").should('have.value', wechatId)
            cy.get("[name='line']").should('have.value', lineId)
            cy.get("[name='qq']").should('have.value', qqId)
        })
    })
})