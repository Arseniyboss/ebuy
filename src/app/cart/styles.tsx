'use client'

import styled from 'styled-components'
import { Button } from '@styles/globals'

export const Container = styled.div`
  display: flex;
  /* justify-content: space-around; */
  justify-content: space-between;
  padding: 0 4rem;

  color: var(--gray);
`

export const CartItemContainer = styled.div`
  /* display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 2rem;
  padding: 0 2rem; */

  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  /* padding: 0 2rem; */
`

export const CartTotal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* position: sticky; */
  /* bottom: 0; */
  /* display: flex; */
  /* flex-direction: column; */

  /* align-items: center; */

  /* width: 100vw; */
  /* background: grey; */
`

export const CheckoutButton = styled(Button)`
  background-color: var(--gray);
  padding: 1rem;
  text-transform: uppercase;
`
