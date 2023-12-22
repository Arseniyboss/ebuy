import { NextResponse } from 'next/server'
import { UserPayload } from '@/types/jwtPayload'
import { redirect } from './redirect'

export const protectCheckoutRoute = (pathname: string, user: UserPayload) => {
  if (!user.cartItems) {
    return redirect('/cart')
  }
  if (pathname === '/payment' && !user.address) {
    return redirect('/address')
  }
  if (pathname === '/order/review' && !user.paymentMethod) {
    return redirect('/payment')
  }
  return NextResponse.next()
}
