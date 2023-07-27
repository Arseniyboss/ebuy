'use client'

import styled from 'styled-components'
import { CartItemContainer } from '@app/cart/styles'
import { breakpoints } from '@breakpoints'

export const OrderSummary = styled(CartItemContainer)`
  @media screen and (max-width: ${breakpoints.cart.small}) {
    align-items: center;
  }
`

export const OrderDetails = styled(CartItemContainer)`
  gap: 1rem;
`
