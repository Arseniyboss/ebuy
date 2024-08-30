export const isLocalTest = () => {
  return Cypress.config('baseUrl').includes('localhost')
}
