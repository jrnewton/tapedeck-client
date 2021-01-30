describe('basic smoke tests', () => {
  it('should load archive page via button click', () => {
    cy.visit('/').get('[data-cy=yourArchivesButton]').click();
    cy.url().should('include', '/archives.html');
  });

  it('should load login page via button click', () => {
    cy.visit('/').get('[data-cy=loginButton]').click();
    cy.url().should('include', '/auth-login.html');
  });

  it('should load create account page via button click', () => {
    cy.visit('/').get('[data-cy=createAccountButton]').click();
    cy.url().should('include', '/auth-create.html');
  });
});
