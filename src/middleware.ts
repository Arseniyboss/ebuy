import { NextRequest, NextResponse } from 'next/server'
import { redirect } from '@utils/redirect'
import { decodeToken } from '@auth/decodeToken/requestCookies'

// checkout steps make the last e2e test in Address and Payment Method pages fail

export const middleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname
  const user = await decodeToken(request)

  if (pathname === '/login' || pathname === '/register') {
    if (user) {
      return redirect('/')
    }
    return NextResponse.next()
  }

  if (!user) {
    return redirect('/login')
  }

  if (pathname === '/address' && !user.cartItems) {
    return redirect('/cart')
  }

  if (pathname === '/payment' && !user.address) {
    return redirect('/address')
  }

  if (pathname === '/order/review' && !user.paymentMethod) {
    return redirect('/payment')
  }
}

export const config = {
  matcher: [
    '/profile',
    '/address',
    '/payment',
    '/order/review',
    '/login',
    '/register',
  ],
}
