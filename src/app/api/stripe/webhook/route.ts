import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@utils/stripe'

export const POST = async (request: NextRequest) => {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!
  const secret = process.env.STRIPE_WEBHOOK_SECRET

  const event = stripe.webhooks.constructEvent(body, signature, secret)

  if (event.type === 'checkout.session.completed') {
    console.log('Payment Successful!')
  }

  return NextResponse.json({ success: true })
}
