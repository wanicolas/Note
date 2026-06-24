describe("test création et suppression d'une note", () => {
  const api = 'http://localhost:8080';
  const appUrl = 'http://localhost:4200';

  it('Ce connect, crée une note, la visualise et la supprime', () => {
    cy.visit('http://localhost:4200');
    cy.contains('notes').should('be.visible');

    cy.get('input[name="username"]').type('user');
    cy.get('input[name="password"]').type('password{enter}');

    cy.url().should('include', '/notes');

    const title = 'Titre test ' + Math.floor(Math.random() * 1000);
    const content = 'Contenu test';
    cy.request('POST', `${api}/notes/add`, { title, content }).then(() => {
      cy.visit(appUrl);
      cy.contains(title).should('be.visible');

      cy.contains(title)
        .parents('article')
        .within(() => {
          cy.get('.delete-note').click();
        });

      cy.contains(title).should('not.exist');
    });
  });
});
