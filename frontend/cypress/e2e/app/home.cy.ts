describe('home page test', () => {
  it('should display welcome message', () => {
    cy.visit('http://localhost:4200');

    cy.contains('notes').should('be.visible');
  });
});
