import { NextRequest } from 'next/server'
import { Handler } from '@/utils/api/withAuth/dynamicHandler/types'
import { PageParams } from '@/types/params'
import { throwError } from '@/utils/api/throwError'
import { getUser } from '@/utils/api/getUser'

export const withAuth = <T>(handler: Handler<T>) => {
  return async (request: NextRequest, { params }: PageParams) => {
    const user = await getUser(request)
    if (!user) {
      return throwError({ error: 'User not found', status: 404 })
    }
    return handler({ request, user, params })
  }
}
