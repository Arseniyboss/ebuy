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

  return NextResponse.next()
}

export const config = {
  matcher: ['/profile', '/login', '/register'],
}
