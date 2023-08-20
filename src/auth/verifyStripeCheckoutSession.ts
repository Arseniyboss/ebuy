import { NextRequest } from 'next/server'
import { stripe } from '@utils/api/stripe'

export const verifyStripeCheckoutSession = async (request: NextRequest) => {
  const sessionId = request.headers.get('authorization')?.split(' ')[1]

  if (!sessionId) return

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return session
  } catch (error) {
    return
  }
}
