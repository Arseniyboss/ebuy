Cypress.Commands.add('assertText', (testId, text, index = 0) => {
  cy.getByTestId(testId).eq(index).should('have.text', text)
})

Cypress.Commands.add('assertValue', (testId, value, index = 0) => {
  cy.getByTestId(testId).eq(index).should('have.value', value)
})

Cypress.Commands.add('assertEmpty', (testId) => {
  cy.getByTestId(testId).should('have.value', '')
})

Cypress.Commands.add('assertLength', (testId, value) => {
  cy.getByTestId(testId).should('have.length', value)
})

Cypress.Commands.add('assertDisabled', (testId) => {
  cy.getByTestId(testId).should('be.disabled')
})

Cypress.Commands.add('assertDisabledLink', (testId) => {
  cy.getByTestId(testId).should('have.css', 'pointer-events', 'none')
  cy.getByTestId(testId).should('have.attr', 'tabindex', '-1')
})

Cypress.Commands.add('assertChecked', (testId) => {
  cy.getByTestId(testId).should('be.checked')
})
