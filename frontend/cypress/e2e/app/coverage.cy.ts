
describe('Instrumentation', () => {
  it('expose __coverage__', () => {
    cy.visit('/')                    // baseUrl = http://localhost:4200
    cy.window().its('__coverage__').should('exist')
  })
})
