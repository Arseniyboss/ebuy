Cypress.Commands.add('getImage', (testId) => {
  cy.getByTestId(testId)
    .should('be.visible')
    .and((img) => {
      expect(img[0].naturalWidth).to.be.greaterThan(0)
    })
})

Cypress.Commands.add('getMessage', (dataId, value, index = 0) => {
  cy.getByTestId(dataId).eq(index).should('have.text', value)
})

Cypress.Commands.add('getTemporaryMessage', (dataId, value) => {
  cy.getMessage(dataId, value)
  cy.wait(3000)
  cy.getByTestId(dataId).should('not.exist')
})
