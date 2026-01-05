import { NextRequest, NextResponse } from 'next/server'
import { getSession } from './auth/session/cookies'
import { getSessionId } from '@/auth/getters/getSessionId'
import { refreshAccessToken } from '@/auth/api/refreshAccessToken'

export const proxy = async (request: NextRequest) => {
  const session = await getSession()
  const sessionId = await getSessionId()

  if (!session && sessionId) {
    return refreshAccessToken(request)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
