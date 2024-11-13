import { NextRequest } from 'next/server'
import { Handler } from './types'
import { PageParams } from '@/types/params'
import { throwError } from '@/utils/api/throwError'
import { getUser } from '@/utils/api/getUser'

export const withAdminAuth = <T>(handler: Handler<T>) => {
  return async (request: NextRequest, { params }: PageParams) => {
    const user = await getUser(request)
    if (!user) {
      return throwError({ error: 'User not found', status: 404 })
    }
    if (!user.isAdmin) {
      return throwError({ error: 'Not authorized', status: 401 })
    }
    return handler({ request, user, params })
  }
}
