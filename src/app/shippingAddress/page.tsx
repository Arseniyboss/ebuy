import { notFound } from 'next/navigation'
import { getUser } from '@api/users/getUser'
import { decodeToken } from '@auth/decodeToken/cookies'
import ShippingAddressForm from './form'

const ShippingAddress = async () => {
  const user = await getUser()
  const payload = await decodeToken()

  if (!user) {
    return notFound()
  }

  return (
    <ShippingAddressForm
      shippingAddress={user.shippingAddress}
      payload={payload!}
    />
  )
}

export default ShippingAddress
