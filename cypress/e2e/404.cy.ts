it('renders 404 page', () => {
  cy.visit('/xyz', { failOnStatusCode: false })
  cy.getImage('404-image')
  cy.assertText('404-heading', 'Page Not Found')
  cy.verifyLink('home-link', '/')
})
