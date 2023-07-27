import { getUser } from '@api/users/getUser'
import { decodeToken } from '@auth/decodeToken/cookies'
import { Heading } from '@styles/globals'
import CheckoutSteps from '@components/checkoutSteps/CheckoutSteps'

const PlaceOrder = async () => {
  const user = await getUser()
  const payload = await decodeToken()
  return (
    <>
      <CheckoutSteps user={payload!} center={true} />
      <Heading>Place Order</Heading>
    </>
  )
}

export default PlaceOrder
