/// <reference types="cypress" />

Cypress.Commands.add('getByTestId', (testId) => {
  cy.get(`[data-testid=${testId}]`)
})

Cypress.Commands.add('getMessage', (dataId, value) => {
  cy.getByTestId(dataId).should('have.text', value)
})

Cypress.Commands.add('getImage', (testId) => {
  cy.getByTestId(testId)
    .should('be.visible')
    .and((img) => {
      expect(img[0].naturalWidth).to.be.greaterThan(0)
    })
})

Cypress.Commands.add('assertDisabled', (testId) => {
  cy.getByTestId(testId).should('be.disabled')
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

Cypress.Commands.add('submitForm', (dataId) => {
  cy.getByTestId(dataId).submit()
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

Cypress.Commands.add('verifyUrl', (url) => {
  cy.location('pathname').should('eq', url)
})

Cypress.Commands.add('verifyLink', (testId, url) => {
  cy.getByTestId(testId).click()
  cy.verifyUrl(url)
  cy.go('back')
})

Cypress.Commands.add('verifyNavLink', (testId, url) => {
  cy.getByTestId(testId).click()
  cy.verifyUrl(url)
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

Cypress.Commands.add('verifyCookie', (name) => {
  cy.getCookie(name).then((cookie) => {
    expect(cookie.secure).to.be.true
    expect(cookie.httpOnly).to.be.true
    expect(cookie.sameSite).to.equal('strict')
  })
})
