describe('Test login ', () => {
  it('login', () => {
    cy.visit('http://localhost:5173/')
    cy.url().should('include', '/login')
    cy.get('#email').type('jorgemc1294@gmail.com')
    cy.get('#password').type('12345')
    cy.get('button').click()
    cy.url().should('equal', 'http://localhost:5173/')
  })

  it('logout', () => {
    cy.visit('http://localhost:5173/')
    cy.url().should('include', '/login')
    cy.get('#email').type('a@gmail.com')
    cy.get('#password').type('12345')
    cy.get('button').click()
    cy.url().should('include', '/login')
  })
})

