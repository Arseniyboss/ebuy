import { UserLoginParams } from '@/types/params'
import { User } from '@/types/api'

declare global {
  namespace Cypress {
    interface Chainable {
      login(userCredentials: UserLoginParams): Chainable<Element>
      logout(): Chainable<Element>
      getUser(): Chainable<Response<User>>
    }
  }
}

export {}
