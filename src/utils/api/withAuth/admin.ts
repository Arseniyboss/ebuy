import { Handler } from './types'
import { withAuth } from '@/utils/api/withAuth'
import { throwError } from '../throwError'

export const withAdminAuth = <T>(handler: Handler<T>) => {
  return withAuth(async ({ request, user }) => {
    if (!user.isAdmin) {
      return throwError({ error: 'Not authorized', status: 401 })
    }
    return handler({ request, user })
  })
}
