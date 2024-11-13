import { Address } from '@/types/user'
import { withAuth } from '@/middleware/api/withAuth'
import { generateAuthTokens } from '@/auth/api/generateAuthTokens'

export const PUT = withAuth(async ({ request, user }) => {
  const address: Address = await request.json()
  user.address = address
  await user.save()
  return generateAuthTokens(user, 201)
})
