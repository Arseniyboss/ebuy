import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getUser } from '@/api/users/getUser'
import { decodeToken } from '@/auth/token/decode/cookies'
import PaymentMethodForm from './form'

export const metadata: Metadata = {
  title: 'Payment',
}

const PaymentMethod = async () => {
  const user = await getUser()
  const session = await decodeToken()

  if (!user) {
    return notFound()
  }

  return (
    <PaymentMethodForm
      paymentMethod={user.paymentMethod}
      payload={session!.user}
    />
  )
}

export default PaymentMethod
