describe('basic smoke tests', () => {
  it('should load archive page via button click', () => {
    cy.visit('/').get('[data-cy=yourArchivesButton]').click();
    cy.url().should('include', '/archives.html');
  });
});
