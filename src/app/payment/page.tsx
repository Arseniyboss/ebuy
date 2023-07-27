import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getUser } from '@api/users/getUser'
import { decodeToken } from '@auth/decodeToken/cookies'
import PaymentMethodForm from './form'

export const metadata: Metadata = {
  title: 'Payment',
}

const PaymentMethod = async () => {
  const user = await getUser()
  const payload = await decodeToken()

  if (!user) {
    return notFound()
  }

  return (
    <PaymentMethodForm paymentMethod={user.paymentMethod} payload={payload!} />
  )
}

export default PaymentMethod
