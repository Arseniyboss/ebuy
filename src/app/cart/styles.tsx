'use client'

import styled from 'styled-components'
import { Button } from '@styles/globals'

export const Container = styled.div`
  width: 1200px;
  max-width: 90vw;
  margin: 0 auto;
  color: var(--gray);
`

export const CartItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
`

export const CartTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--gap);

  @media screen and (max-width: 400px) {
    flex-direction: column;
    align-items: initial;
    text-align: center;
    gap: 1rem;
  }
`

export const CheckoutButton = styled(Button)`
  background-color: var(--gray);
  padding: 0.8rem 1.5rem;
`
