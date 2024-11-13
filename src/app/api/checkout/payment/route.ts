import { PaymentMethod } from '@/types/user'
import { withAuth } from '@/middleware/api/withAuth'
import { generateAuthTokens } from '@/auth/api/generateAuthTokens'

export const PUT = withAuth(async ({ request, user }) => {
  const paymentMethod: PaymentMethod = await request.json()
  user.paymentMethod = paymentMethod
  await user.save()
  return generateAuthTokens(user, 201)
})
