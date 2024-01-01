import { getSession } from './auth/session/cookies'
import { getSessionId } from '@/auth/getters/getSessionId'
import { refreshAccessToken } from '@/auth/api/refreshAccessToken'

export const middleware = async () => {
  const session = await getSession()
  const sessionId = getSessionId()

  if (!session && sessionId) {
    return refreshAccessToken()
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
