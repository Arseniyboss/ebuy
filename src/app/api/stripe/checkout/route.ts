import { NextRequest, NextResponse } from 'next/server'
import { CartItem } from 'types/api'
import { stripe } from '@utils/stripe'
import { getStripeItems } from '@utils/getStripeItems'
import { throwError } from '@utils/throwError'

type Body = {
  orderItems: CartItem[]
  orderId: string
}

export const POST = async (request: NextRequest) => {
  const orderUrl = request.headers.get('referer')!
  const { orderItems, orderId }: Body = await request.json()

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: getStripeItems(orderItems),
    cancel_url: orderUrl,
    success_url: orderUrl,
    metadata: { orderId },
  })

  if (!session) {
    return throwError({ error: 'Error creating checkout session', status: 500 })
  }

  return NextResponse.json(session.url)
}
