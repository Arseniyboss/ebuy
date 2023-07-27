import { notFound } from 'next/navigation'
import { getUser } from '@api/users/getUser'
import { decodeToken } from '@auth/decodeToken/cookies'
import PaymentMethodForm from './form'

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
