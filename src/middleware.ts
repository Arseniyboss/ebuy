import { NextRequest, NextResponse } from 'next/server'
import { decodeToken } from '@/auth/token/decode/requestCookies'
import { isRouteProtected } from './utils/api/middleware/isRouteProtected'
import { redirect } from '@/utils/api/middleware/redirect'
import { setCookie } from './utils/api/middleware/setCookie'
import { generateTokenCookie } from './auth/token/generators/generateTokenCookie'
import { hour } from './constants/time'

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl
  const session = await decodeToken(request)

  if (pathname === '/login' || pathname === '/register') {
    if (session) {
      return redirect('/')
    }
    return NextResponse.next()
  }

  if (!session) {
    if (isRouteProtected(pathname)) {
      return redirect('/login')
    }
    return NextResponse.next()
  }

  if (pathname.startsWith('/admin') && !session.user.isAdmin) {
    return redirect('/')
  }

  if (pathname === '/address') {
    if (!session.user.cartItems) {
      return redirect('/cart')
    }
  }

  if (pathname === '/payment') {
    if (!session.user.cartItems) {
      return redirect('/cart')
    }
    if (!session.user.address) {
      return redirect('/address')
    }
  }

  if (pathname === '/order/review') {
    if (!session.user.cartItems) {
      return redirect('/cart')
    }
    if (!session.user.paymentMethod) {
      return redirect('/payment')
    }
  }

  if (Date.now() + hour >= session.expirationTime) {
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
