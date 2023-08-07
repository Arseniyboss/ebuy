'use client'

import styled from 'styled-components'
import { CartItemContainer } from '@app/cart/styles'

export const OrderDetails = styled(CartItemContainer)`
  width: 570px;
  max-width: 90vw;
  gap: 1rem;
  word-wrap: break-word;
`

export const OrderId = styled.h1`
  word-wrap: break-word;
`
