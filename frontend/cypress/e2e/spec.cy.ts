describe('template spec', () => {

  beforeEach(() => {
  cy.visit('http://localhost:5173/')
  })

  it('Loading ', () => {
    cy.contains('Welcome')
    cy.get(`[data-cy="form"]`).should('exist')
  })


  it('Login ', () => {
    cy.get('input[placeholder="Email"]').type('admin')
    cy.get('input[placeholder="Password"]').type('admin')
    cy.get(`[data-cy="login-button"]`).click()

  })
})
