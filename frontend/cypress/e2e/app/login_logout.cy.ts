describe('test connection', () => {
  it("affiche la page d'accueil", () => {
    cy.visit('http://localhost:4200');
    
    cy.contains('notes').should('be.visible');

    cy.get('input[name="username"]').type('user');

    cy.get('input[name="password"]').type('password{enter}');

    cy.url().should('include', '/notes');

    cy.get('.logout').click();
  });
});
