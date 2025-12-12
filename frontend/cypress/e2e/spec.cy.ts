describe('template spec', () => {

  beforeEach(() => {
  cy.visit('http://localhost:5173/')
  })

  it('Sidan laddas, välkommen visas och logga in är det första man möts av', () => {
    cy.contains('Welcome')
    cy.get(`[data-cy="form"]`).should('exist')
  })

  it('Logga in och dashboard visas som förväntat ', () => {
    cy.get('input[placeholder="Email"]').type('admin')
    cy.get('input[placeholder="Password"]').type('admin')
    cy.get(`[data-cy="login-button"]`).click()
    cy.get('[data-cy="add-btn"]').should('exist')
  })

  it('Lägg till transaktion modal visas vid klick på lägg till transaktion', () => {
    cy.get('input[placeholder="Email"]').type('admin')
    cy.get('input[placeholder="Password"]').type('admin')
    cy.get(`[data-cy="login-button"]`).click()
    cy.get('[data-cy="add-btn"]').click()
    cy.contains('Lägg till ny transaction').should('exist')
  })
  it('Chart component finns på dashboard', () => {
    cy.get('input[placeholder="Email"]').type('admin')
    cy.get('input[placeholder="Password"]').type('admin')
    cy.get(`[data-cy="login-button"]`).click()
    cy.get('[data-cy="chart-component"]').should('exist')
  })

  it('Kan fylla i och skicka formulär för ny transaktion', () => {
     cy.get('input[placeholder="Email"]').type('admin')
    cy.get('input[placeholder="Password"]').type('admin')
    cy.get(`[data-cy="login-button"]`).click()
    cy.get('[data-cy="add-btn"]').click()
    cy.get('[data-cy="desc-input"]').type('Test')
    cy.get('[data-cy="amount-input"]').type('300')
    cy.get('[data-cy="category-checkbox"]').first().check()
    cy.get('[data-cy="add-transaction-btn"]').click()
  })

  after(() => {
  })


})
