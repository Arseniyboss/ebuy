import { NextRequest } from 'next/server'
import { Handler } from './types'
import { getUser } from '@/utils/api/getUser'
import { throwError } from '../throwError'

export const withAuth = <T>(handler: Handler<T>) => {
  return async (request: NextRequest) => {
    const user = await getUser(request)
    if (!user) {
      return throwError({ error: 'User not found', status: 404 })
    }
    return handler({ request, user })
  }
}
