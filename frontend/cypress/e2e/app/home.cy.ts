describe('home page test', () => {
    it('hello displayed', () => {
        // Act
        cy.visit('http://localhost:4200');
        // Assert
        cy.contains('Hello').should('be.visible');
    })
})