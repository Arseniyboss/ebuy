import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@utils/stripe'
import { markAsPaid } from '@api/orders/markAsPaid'
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

    await markAsPaid(orderId)
    await revalidateTag('order')
  }

  return NextResponse.json({ success: true })
}
