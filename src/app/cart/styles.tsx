'use client'

import styled from 'styled-components'
import { Button } from '@styles/globals'

export const CartTotal = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 400px) {
    flex-direction: column;
    align-items: initial;
    gap: 1rem;
  }
`

export const CheckoutButton = styled(Button)`
  background-color: var(--gray);
  padding: 0.8rem 1.5rem;
  text-align: center;
`
