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
      <NavLink href='/address'>Address</NavLink>
      <NavLink href='/payment' disabled={!user.address}>
        Payment
      </NavLink>
      <NavLink href='/order/review' disabled={!user.paymentMethod}>
        Review
      </NavLink>
    </Container>
  )
}

export default CheckoutSteps
