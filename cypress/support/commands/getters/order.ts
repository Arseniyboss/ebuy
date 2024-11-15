Cypress.Commands.add('getOrder', (id) => {
  cy.getCookie('accessToken').then((cookie) => {
    const accessToken = cookie.value
    cy.request({
      method: 'GET',
      url: `/api/orders/${id}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  })
})

Cypress.Commands.add('getUserOrders', ({ page = 1, status = '' } = {}) => {
  cy.getCookie('accessToken').then((cookie) => {
    const accessToken = cookie.value
    cy.request({
      method: 'GET',
      url: `/api/orders/?page=${page}&status=${status}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  })
})

Cypress.Commands.add('getOrders', ({ page = 1, status = '' } = {}) => {
  cy.getCookie('accessToken').then((cookie) => {
    const accessToken = cookie.value
    cy.request({
      method: 'GET',
      url: `/api/admin/orders/?page=${page}&status=${status}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  })
})
