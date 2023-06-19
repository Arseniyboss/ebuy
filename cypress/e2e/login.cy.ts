// import { verifyToken } from '../../src/utils/token/verifyToken'

import { verify } from 'jsonwebtoken'

before(() => {
  cy.task('seedUsers')
  // cy.request('/api/revalidate?tag=products')
})

beforeEach(() => {
  cy.intercept('POST', '/api/users/login').as('login')
  cy.visit('/login')
  // cy.wait(100)
})

after(() => {
  cy.task('deleteUsers')
})

describe('Login Page', () => {
  // it('verifies form link', () => {
  //   cy.verifyLink('register-link', '/register')
  // })

  // it('submits the form with empty input fields and shows error messages', () => {
  //   cy.wait(100)
  //   cy.submitForm('login-form')
  //   cy.getMessage('email-error', 'Email is required')
  //   cy.getMessage('password-error', 'Password is required')
  // })

  // it('submits the form with a non-empty email', () => {
  //   cy.typeInto('email-input', 'john@gmail.com')
  //   cy.submitForm('login-form')
  //   cy.getByTestId('email-error').should('not.exist')
  // })

  // it('submits the form with a non-empty password', () => {
  //   cy.typeInto('password-input', '12345')
  //   cy.submitForm('login-form')
  //   cy.getByTestId('password-error').should('not.exist')
  // })

  // it('submits the form with invalid credentials and shows an error message', () => {
  //   cy.typeInto('email-input', 'john@example.com')
  //   cy.typeInto('password-input', '12345')
  //   cy.submitForm('login-form')
  //   cy.getMessage('error-message', 'Invalid credentials')
  // })

  it('submits the form with valid input fields and logs the user in', () => {
    cy.typeInto('email-input', 'john@example.com')
    cy.typeInto('password-input', '123456')
    cy.submitForm('login-form')

    // cy.getByTestId('error-message').should('not.exist')
    // cy.assertDisabled('login-button')

    // cy.location('pathname').should('eq', '/')

    cy.wait('@login').then(({ response }) => {
      // console.log(response.headers)
      // cy.log(response.statusCode.toString())
      // const headers = response.headers['set-cookie'][0]
      // cy.log(headers)
      cy.getCookie('token').then((cookie) => {
        cy.log(cookie.httpOnly.toString())
        cy.log(cookie.secure.toString())
        cy.log(cookie.sameSite.toString())
        cy.log(cookie.value)

        const JWT_SECRET = Cypress.env('JWT_SECRET')

        // cy.log(JWT_SECRET)
        if (JWT_SECRET != null) {
          const payload = verify(cookie.value, JWT_SECRET)
          cy.log(payload.toString())
        }

        // cy.log(Cypress.env('JWT_SECRET'))

        // const payload = verifyToken(cookie.value)

        // cy.log(payload.name)

        // expect(status).toBe(200)
        // expect(_id.toString()).toBe(payload?.id)
        // expect(name).toBe(payload?.name)
      })
      // const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      // expect(userInfo.name).to.eq('John')
      // expect(userInfo.email).to.eq('john@gmail.com')
      // expect(userInfo).to.have.property('token')
      // expect(userInfo).to.have.property('tokenExpires')
    })
  })
})
