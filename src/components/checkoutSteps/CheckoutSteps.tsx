'use client'

import { NavLinks, NavLink } from './styles'
import { UserPayload } from '@/types/jwtPayload'

type Props = {
  user: UserPayload
  center?: boolean
}

const CheckoutSteps = ({ user, center }: Props) => {
  return (
    <nav aria-label='checkout steps'>
      <NavLinks $center={center}>
        <li>
          <NavLink href='/address' data-testid='address-link'>
            Address
          </NavLink>
        </li>
        <li>
          <NavLink
            href='/payment'
            disabled={!user.address}
            tabIndex={!user.address ? -1 : 0}
            data-testid='payment-link'
          >
            Payment
          </NavLink>
        </li>
        <li>
          <NavLink
            href='/order/review'
            disabled={!user.paymentMethod}
            tabIndex={!user.paymentMethod ? -1 : 0}
            data-testid='order-review-link'
          >
            Review
          </NavLink>
        </li>
      </NavLinks>
    </nav>
  )
}

export default CheckoutSteps
