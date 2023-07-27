'use client'

import { Container, NavLink } from './styles'
import { UserPayload } from 'types/jwtPayload'

type Props = {
  user: UserPayload
  center?: boolean
}

const CheckoutSteps = ({ user, center }: Props) => {
  return (
    <Container $center={center}>
      <NavLink href='/shippingAddress'>Shipping</NavLink>
      <NavLink href='/paymentMethod' disabled={!user.shippingAddress}>
        Payment
      </NavLink>
      <NavLink href='/placeOrder' disabled={!user.paymentMethod}>
        Place Order
      </NavLink>
    </Container>
  )
}

export default CheckoutSteps
