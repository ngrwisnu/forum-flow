/*
- visit the homepage: 'http://localhost:5173'
- find a button with content: 'Login'
- click the button
- get the URL
* assert it includes: '/login'
- find input fields with data-testid: 'login-email' & 'login-password' 
- find a button with data-testid: 'login-button'
- simulate typing
    - with correct credentials
    - with wrong credentials
* assert those inputs have the correct value
- click the login button
* assert it has the correct response
    - success
        - get the URL
        * assert it includes: '/'
    - failed
        * assert that alert shows up
*/

describe('Login cy', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.get('a[href="/login"]').contains(/login/i).click();
  });

  it('should be success with correct credentials', () => {
    cy.url().should('include', '/login');

    cy.get('[data-testid="login-email"]')
      .as('loginEmail')
      .type('roxdoe@email.com');
    cy.get('[data-testid="login-password"]')
      .as('loginPassword')
      .type('secret123');
    cy.get('[data-testid="login-button"]').as('loginButton');

    cy.get('@loginEmail').should('have.value', 'roxdoe@email.com');
    cy.get('@loginPassword').should('have.value', 'secret123');

    cy.get('@loginButton').click();

    cy.url().should('include', '/');
  });

  it('should be fail with wrong credentials', () => {
    cy.url().should('include', '/login');

    cy.get('[data-testid="login-email"]')
      .as('loginEmail')
      .type('roxdoe@email.com');
    cy.get('[data-testid="login-password"]')
      .as('loginPassword')
      .type('wrongsecret123');
    cy.get('[data-testid="login-button"]').as('loginButton');

    cy.get('@loginEmail').should('have.value', 'roxdoe@email.com');
    cy.get('@loginPassword').should('have.value', 'wrongsecret123');

    cy.get('@loginButton').click();

    cy.get('[role="alert"]').parent().as('alert').should('be.visible');

    cy.url().should('include', '/login');
  });
});
