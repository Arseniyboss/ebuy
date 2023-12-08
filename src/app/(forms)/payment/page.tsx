import { Metadata } from 'next'
import { getUser } from '@/api/users/getUser'
import { decodeToken } from '@/auth/token/decode/cookies'
import Message from '@/components/feedback/message/Message'
import PaymentMethodForm from './form'

export const metadata: Metadata = {
  title: 'Payment',
}

const PaymentMethod = async () => {
  const { data: user, error } = await getUser()
  const session = await decodeToken()

  if (error) {
    return <Message variant='error'>{error}</Message>
  }

  if (!user) {
    return <Message variant='error'>User not found</Message>
  }

  return (
    <PaymentMethodForm
      paymentMethod={user.paymentMethod}
      payload={session!.user}
    />
  )
}

export default PaymentMethod
