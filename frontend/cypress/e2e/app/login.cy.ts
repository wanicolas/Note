
describe('Login Page Test', () => {
  it('login', () => {
    cy.visit('http://localhost:4200/')
    cy.contains('Hello, note').should('be.visible')
    
    cy.get('input[name=username]').type("user")
    cy.get('input[name=password]').type(`${"password"}{enter}{enter}`)

    cy.url().should('include', '/notes')

    cy.visit('http://localhost:4200/notes');
    cy.get('.logout').click();
  })
})