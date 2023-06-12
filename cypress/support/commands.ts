/// <reference types="cypress" />

Cypress.Commands.add('getByTestId', (testId) => {
  cy.get(`[data-testid=${testId}]`)
})

Cypress.Commands.add('getImage', (testId) => {
  cy.getByTestId(testId)
    .should('be.visible')
    .and((img) => {
      expect(img[0].naturalWidth).to.be.greaterThan(0)
    })
})

Cypress.Commands.add('typeInto', (dataId, text) => {
  cy.getByTestId(dataId).type(text).should('have.value', text)
})

Cypress.Commands.add('selectOption', ({ testId, text, value }) => {
  cy.getByTestId(testId).select(text).should('have.value', value)
})

Cypress.Commands.add('clearInput', (dataId) => {
  cy.getByTestId(dataId).clear()
})

Cypress.Commands.add('clickButton', (dataId) => {
  cy.getByTestId(dataId).click()
})

Cypress.Commands.add('waitDebounce', () => {
  cy.wait(500)
})

Cypress.Commands.add('waitSelect', () => {
  cy.wait(500)
})

Cypress.Commands.add('verifyNavLink', (testId, url) => {
  cy.getByTestId(testId).click()
  cy.location('pathname').should('eq', url)
})

Cypress.Commands.add('verifyFirstDynamicLink', (testId, url) => {
  cy.getByTestId(testId).eq(0).click()
  cy.location('pathname').should('eq', url)
  cy.go('back')
})

Cypress.Commands.add('verifySort', (prices) => {
  cy.getByTestId('product-price').each((element, index) => {
    const price = Number(element.text().slice(1))
    expect(price).to.eq(prices[index])
  })
})

Cypress.Commands.add('verifyCartItem', (receivedItem, expectedItem) => {
  expect(receivedItem._id).to.equal(expectedItem._id)
  expect(receivedItem.name).to.equal(expectedItem.name)
  expect(receivedItem.price).to.equal(expectedItem.price)
})
