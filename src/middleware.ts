import { NextRequest, NextResponse } from 'next/server'
import { redirect } from '@utils/redirect'
import { decodeToken } from '@auth/decodeToken/requestCookies'

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

  if (pathname === '/shippingAddress' && !user.cartItems) {
    return redirect('/cart')
  }

  if (pathname === '/paymentMethod' && !user.shippingAddress) {
    return redirect('/shippingAddress')
  }

  if (pathname === '/placeOrder' && !user.paymentMethod) {
    return redirect('/paymentMethod')
  }
}

export const config = {
  matcher: [
    '/profile',
    '/shippingAddress',
    '/paymentMethod',
    '/placeOrder',
    '/login',
    '/register',
  ],
}
