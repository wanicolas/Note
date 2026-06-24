describe("regarde le detail d'une note", () => {
  it("Se connecte, regarde une les details d'une note", () => {
    cy.visit('http://localhost:4200');

    cy.contains('notes').should('be.visible');

    cy.get('input[name="username"]').type('user');

    cy.get('input[name="password"]').type('password{enter}');

    cy.url().should('include', '/notes');

    cy.get('article').should('exist');

    cy.get('article')
      .first()
      .find('h2')
      .invoke('text')
      .then((title) => {
        cy.contains(title).should('be.visible').click();

        cy.intercept('/notes/**');

        cy.get('h2').should('have.text', title);

        cy.contains('Retour à la liste des notes').click();

        cy.url().should('include', '/notes');
      });
  });
});
