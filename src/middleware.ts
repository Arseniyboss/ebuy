import { NextRequest, NextResponse } from 'next/server'
import { decodeToken } from '@/auth/token/decode/requestCookies'
import { getCurrentTimestamp } from './utils/getters/getCurrentTimestamp'
import { redirect } from '@/utils/api/middleware/redirect'
import { setCookie } from './utils/api/middleware/setCookie'
import { generateTokenCookie } from './auth/token/generators/generateTokenCookie'
import { isAuthRoute } from './utils/api/middleware/routeCheckers/isAuthRoute'
import { isProtectedRoute } from './utils/api/middleware/routeCheckers/isProtectedRoute'
import { isCheckoutRoute } from './utils/api/middleware/routeCheckers/isCheckoutRoute'
import { protectCheckoutRoute } from './utils/api/middleware/protectCheckoutRoute'
import { isAdminRoute } from './utils/api/middleware/routeCheckers/isAdminRoute'
import { hour } from './constants/time'

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl
  const session = await decodeToken(request)
  const currentTimestamp = getCurrentTimestamp()

  if (isAuthRoute(pathname) && session) {
    return redirect('/')
  }

  if (isProtectedRoute(pathname) && !session) {
    return redirect('/login')
  }

  if (!session) {
    return NextResponse.next()
  }

  if (isAdminRoute(pathname) && !session.user.isAdmin) {
    return redirect('/')
  }

  if (isCheckoutRoute(pathname)) {
    return protectCheckoutRoute(pathname, session.user)
  }

  if (currentTimestamp + hour >= session.expirationTime) {
    const tokenCookie = await generateTokenCookie(session.user)
    return setCookie(tokenCookie)
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
