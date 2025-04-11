/*
- visit the homepage: 'http://localhost:5173'
- find link with href: '/threads/create'
- click the link
* assert that url includes: '/login'
- log in with correct credentials
* assert that url includes: '/'
- click link to create new thread
* assert that url includes: '/threads/create'
- find input with data-testid: 'newThread-title'
- find input with data-testid: 'newThread-category'
- find input with data-testid: 'newThread-body'
- find button with data-testid: 'newThread-button'
- simulate typing
    - with title
    - with empty title
* assert those inputs have the correct value
- click the post thread button
- check the response
    - success
        * assert that url includes: '/'
        * assert the new thread's title is visible
    - failed
        * assert the alert shows up
*/

describe('POST NewThread cy', () => {
  const threadData = {
    title: 'New Title',
    category: 'programming',
    body: 'The threads content',
  };

  beforeEach(() => {
    cy.visit('/');

    cy.get('a[href="/threads/create"]').as('createThreadBtn').click();

    cy.url().should('include', '/login');

    cy.get('[data-testid="login-email"]')
      .as('loginEmail')
      .type('roxdoe@email.com');
    cy.get('[data-testid="login-password"]')
      .as('loginPassword')
      .type('secret123');

    cy.get('[data-testid="login-button"]').click();

    cy.url().should('include', '/');
  });

  it('should create new thread with a title', () => {
    cy.get('@createThreadBtn').click();

    cy.url().should('include', '/threads/create');

    cy.get('[data-testid="newThread-title"]')
      .as('newTitle')
      .type(threadData.title);
    cy.get('[data-testid="newThread-category"]')
      .as('newCategory')
      .select(threadData.category);
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('[data-testid="newThread-body"]')
      .as('newBody')
      .focus()
      .type(threadData.body)
      .blur();
    cy.get('[data-testid="newThread-button"]').as('submitThreadBtn');

    cy.get('@newTitle').should('have.value', threadData.title);
    cy.get('@newCategory').should('have.value', threadData.category);
    cy.get('@newBody').should('have.html', threadData.body);
    cy.get('@submitThreadBtn').click();

    cy.url().should('include', '/');

    cy.get('a').contains(threadData.title).should('be.visible');
  });

  it('should show error alert when post new thread without title', () => {
    cy.get('@createThreadBtn').click();

    cy.url().should('include', '/threads/create');

    cy.get('[data-testid="newThread-title"]').as('newTitle');
    cy.get('[data-testid="newThread-category"]')
      .as('newCategory')
      .select(threadData.category);
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('[data-testid="newThread-body"]')
      .as('newBody')
      .focus()
      .type(threadData.body)
      .blur();
    cy.get('[data-testid="newThread-button"]').as('submitThreadBtn');

    cy.get('@newTitle').should('have.value', '');
    cy.get('@newCategory').should('have.value', threadData.category);
    cy.get('@newBody').should('have.html', threadData.body);
    cy.get('@submitThreadBtn').click();

    cy.get('[role="alert"]', { timeout: 6000 })
      .parent()
      .as('alert')
      .should('have.class', 'top-0');

    cy.url().should('include', '/threads/create');
  });
});
