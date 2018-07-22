const server = Cypress.env('server');
export const MESSENGERS = [ 'skype', 'kakaotalk', 'wechat', 'line', 'qq' ];
var url = {
    englishas: '',
    katalkenglish: '',
    ontue: '',
    withcenter: ''
};
var port = '';
const testuser = {
    email: 'testuser@gmail.com',
    password: '12345a'
};


if (server == 'local') {
    port = '4200';
}

if (server == 'local') {
    url['englishas'] = 'http://abc.englishas.org:' + port;
    url['katalkenglish'] = 'http://katalkenglish.org:' + port;
    url['ontue'] = 'http://ontue.org:' + port;
    url['withcenter'] = 'http://withcenter.org:' + port;
} else if (server == 'remote') {
    url['englishas'] = 'https://www.englishas.com';
    url['katalkenglish'] = 'https://www.katalkenglish.com';
    url['ontue'] = 'https://www.ontue.com';
    url['withcenter'] = 'http://www.withcenter.com';
}

export const config = {
    server: server,
    url: url,
    testuser: testuser
};


/**
 * It will first visits the site.
 */
Cypress.Commands.add('login', url => {
    cy.visit(url);
    cy.get("[data-button='desktop-login']").click();
    cy.get("[name='email']").type(testuser.email);
    cy.get("[name='password']").type(testuser.password);
    cy.get("[data-button='login']").click();
    cy.get("[data-button='desktop-session-past']");
});

/**
 * It does not visit the site.
 * 
 * @description
 *      1. It simply open the menu page and clicks the menu button.
 *      2. It checks if checker appears.
 * 
 * @param page - [data-button='xxx'] in page menu.
 * @param checker - is the [data-role='xxxx'] in the opened page.
 * @param url - to visit first
 * 
 * @example cy.open( 'reminder-page', 'forum-page', config.url.katalkenglish);
 */
Cypress.Commands.add('open', (page, checker, url) => {
    if ( url ) {
        cy.visit(url);
    }
    cy.get('[data-button="menu"]').click();
    cy.get("[data-button='"+page+"'").click();
    cy.get("[data-role='"+checker+"']")
})