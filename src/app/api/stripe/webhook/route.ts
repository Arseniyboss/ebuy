import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@utils/stripe'
import { updateOrderToPaid } from '@api/orders/updateOrderToPaid'
import { revalidateTag } from '@api/revalidateTag'

type Metadata = {
  orderId: string
}

export const POST = async (request: NextRequest) => {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!
  const secret = process.env.STRIPE_WEBHOOK_SECRET

  const event = stripe.webhooks.constructEvent(body, signature, secret)

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const metadata = session.metadata as Metadata
    const orderId = metadata.orderId

    await updateOrderToPaid(orderId, session.id)
    await revalidateTag('order')
  }

  return NextResponse.json(null)
}
