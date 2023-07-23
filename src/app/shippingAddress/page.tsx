import { notFound } from 'next/navigation'
import { getUser } from '@api/users/getUser'
import ShippingAddressForm from './form'

const ShippingAddress = async () => {
  const user = await getUser()

  if (!user) {
    return notFound()
  }

  return (
    <ShippingAddressForm shippingAddress={user.checkout?.shippingAddress} />
  )
}

export default ShippingAddress
