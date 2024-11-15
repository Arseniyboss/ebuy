Cypress.Commands.add('login', (userCredentials) => {
  cy.request({
    method: 'POST',
    url: '/api/users/login',
    body: userCredentials,
  }).then(() => {
    cy.verifyCookie('accessToken')
    cy.reload()
  })
})

Cypress.Commands.add('logout', () => {
  cy.request({
    method: 'POST',
    url: '/api/users/logout',
  }).then(() => {
    cy.getCookie('accessToken').then((cookie) => {
      expect(cookie).to.be.null
    })
    cy.reload()
  })
})

Cypress.Commands.add('getUser', () => {
  cy.getCookie('accessToken').then((cookie) => {
    const accessToken = cookie.value
    cy.request({
      method: 'GET',
      url: '/api/users/user',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  })
})
