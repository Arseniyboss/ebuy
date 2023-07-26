import { notFound } from 'next/navigation'
import { getUser } from '@api/users/getUser'
import PaymentMethodForm from './form'

const PaymentMethod = async () => {
  const user = await getUser()

  if (!user) {
    return notFound()
  }

  return <PaymentMethodForm paymentMethod={user.paymentMethod} />
}

export default PaymentMethod
