import { Handler } from './types'
import { withAuth } from './withAuth'
import { throwError } from '@/utils/api/throwError'

export const withAdminAuth = <T>(handler: Handler<T>) => {
  return withAuth(async ({ request, user }) => {
    if (!user.isAdmin) {
      return throwError({ error: 'Not authorized', status: 401 })
    }
    return handler({ request, user })
  })
}
