Cypress.Commands.add('getByTestId', (testId) => {
  cy.get(`[data-testid=${testId}]`)
})

Cypress.Commands.add('typeInto', (dataId, text) => {
  cy.getByTestId(dataId).type(text).should('have.value', text)
})

Cypress.Commands.add('selectOption', ({ testId, text, value, index = 0 }) => {
  cy.getByTestId(testId).eq(index).select(text).should('have.value', value)
})

Cypress.Commands.add('clearInput', (dataId) => {
  cy.getByTestId(dataId).clear()
})

Cypress.Commands.add('submitForm', (dataId) => {
  cy.getByTestId(dataId).submit()
})
