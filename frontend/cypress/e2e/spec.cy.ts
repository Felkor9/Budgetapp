describe('budgetapp', () => {

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

  it('Kan fylla i och lägga till en ny transaktion', () => {
     cy.get('input[placeholder="Email"]').type('admin')
    cy.get('input[placeholder="Password"]').type('admin')
    cy.get(`[data-cy="login-button"]`).click()
    cy.get('[data-cy="add-btn"]').click()
    cy.get('[data-cy="desc-input"]').type('Test')
    cy.get('[data-cy="amount-input"]').type('300')
    cy.get('[data-cy="checkbox-Mat"]').first().check()
    cy.get('[data-cy="add-transaction-btn"]').click()
    cy.task('clearTestDesc')
  })

  it('Försöker logga in med fel email', () => {
    cy.get('input[placeholder="Email"]').type('fel')
    cy.get('input[placeholder="Password"]').type('fel')

    cy.get('[data-cy="login-button"]').click()
     cy.get(".Toastify__toast--error")
      .should("be.visible")
      .and("contain", "Login failed");
  });

  it('Jag har inget konto, jag skapat ett', () => {
    cy.get('[data-cy="create-btn"]').click()
    cy.get('[data-cy="create-name"]').type('Vanja')
    cy.get('[data-cy="create-email"]').type('Vanja')
    cy.get('[data-cy="create-password"]').type('Vanja')
    cy.get('[data-cy="create-new-btn"]').click()
     cy.get(".Toastify__toast--success")
      .should("be.visible")
      .and("contain", "Konto skapat, var vänlig logga in")
    cy.get('[data-cy="login-button"]').should('exist')
    cy.task('clearTestUsers')
  });

  it('Lägger till en kategori', () => {
    cy.get('input[placeholder="Email"]').type('admin')
    cy.get('input[placeholder="Password"]').type('admin')
    cy.get(`[data-cy="login-button"]`).click()
    cy.get('[data-cy="add-cat"]').click()
    cy.get('[data-cy="cat-namn"]').type('TV-abonemang')
    cy.get('[data-cy="cat-type"]').type('Utgift')
    cy.get('[data-cy="cat-btn"]').click()
  })

  it('testar sedan att lägga till en transaktion till den nya kategorin', () => {
    cy.get('input[placeholder="Email"]').type('admin')
    cy.get('input[placeholder="Password"]').type('admin')
    cy.get(`[data-cy="login-button"]`).click()
    cy.get('[data-cy="add-btn"]').click()
    cy.get('[data-cy="desc-input"]').type('Telia')
    cy.get('[data-cy="amount-input"]').type("340")
    cy.get('[data-cy="checkbox-TV-abonemang"]').check()
    cy.get('[data-cy="add-transaction-btn"]').click()
    cy.get(".Toastify__toast--success")
      .should("be.visible")
      .and("contain", "Transaktionen har lagts till")
    cy.task('clearTelia')
    cy.task('clearCat')
  })


  })
