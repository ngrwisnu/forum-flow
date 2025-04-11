describe('My First Test', () => {
  it('Visits the ForumFlow website', () => {
    cy.visit('http://localhost:5173');

    cy.contains(/see leaderboards/i).click();

    cy.url().should('include', '/leaderboards');
  });
});
