import { getPrice } from 'utils/getPrice'

Cypress.Commands.add('verifyUrl', (url) => {
  cy.location('pathname').should('eq', url)
})

Cypress.Commands.add('verifyProtectedUrl', (url) => {
  cy.visit(url)
  cy.verifyUrl('/login')
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
  cy.waitCypressLoading()
})

Cypress.Commands.add('verifySort', (sort) => {
  cy.getByTestId('sort-select').select(sort)
  cy.waitSelect()

  if (sort.includes('rating')) return

  cy.getByTestId('product-price').each(($currentPrice, index, $prices) => {
    if (index === 0) return

    const previousPriceElement = $prices[index - 1]

    cy.wrap(previousPriceElement).then(($previousPrice) => {
      const currentPrice = getPrice($currentPrice)
      const previousPrice = getPrice($previousPrice)

      if (sort === 'price.asc') {
        expect(previousPrice).to.be.lessThan(currentPrice)
      }
      if (sort === 'price.desc') {
        expect(previousPrice).to.be.greaterThan(currentPrice)
      }
    })
  })
})

Cypress.Commands.add('verifyCookie', (name) => {
  cy.getCookie(name).then((cookie) => {
    expect(cookie.secure).to.be.true
    expect(cookie.httpOnly).to.be.true
    expect(cookie.sameSite).to.equal('lax')
  })
})

Cypress.Commands.add('verifyUserUpdate', (input, value) => {
  cy.wait('@updateUser').then(({ response }) => {
    expect(response.statusCode).to.equal(200)
    cy.verifyCookie('accessToken')
    cy.reload()
    cy.assertValue(input, value)
  })
})
