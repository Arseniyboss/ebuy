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
      <NavLink href='/address' data-testid='address-link'>
        Address
      </NavLink>
      <NavLink
        href='/payment'
        disabled={!user.address}
        data-testid='payment-link'
      >
        Payment
      </NavLink>
      <NavLink
        href='/order/review'
        disabled={!user.paymentMethod}
        data-testid='order-review-link'
      >
        Review
      </NavLink>
    </Container>
  )
}

export default CheckoutSteps
