import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/auth/session/requestCookies'
import { getSessionId } from '@/auth/api/getCookies'
import { refreshAccessToken } from '@/auth/api/refreshAccessToken'

export const middleware = async (request: NextRequest) => {
  const session = await getSession(request)
  const sessionId = getSessionId(request)

  if (!session && sessionId) {
    return refreshAccessToken(request)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
