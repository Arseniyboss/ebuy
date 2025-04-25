Cypress.Commands.add('waitDebounce', () => {
  cy.wait(500)
})

Cypress.Commands.add('waitSelect', () => {
  cy.wait(500)
})

// use before first form submission when using beforeEach hook in the describe block
Cypress.Commands.add('waitCypressLoading', () => {
  cy.wait(100)
})

Cypress.Commands.add('waitPayPalLoading', () => {
  cy.wait(5000)
})
