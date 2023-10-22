'use client'

import styled from 'styled-components'
import Image from 'next/image'
import { breakpoints } from '@breakpoints'

export const Container = styled.article`
  display: flex;
  column-gap: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid lightgrey;

  @media screen and (max-width: ${breakpoints.cart.small}) {
    flex-direction: column;
    align-items: center;
  }
`

export const ItemImage = styled(Image)`
  border-radius: var(--border-radius);

  @media screen and (max-width: ${breakpoints.cart.small}) {
    width: 90vw;
    height: auto;
    margin-bottom: 1rem;
  }
`

export const ItemDetails = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.7rem;

  @media screen and (max-width: ${breakpoints.cart.small}) {
    text-align: center;
    align-items: center;
  }
`

export const ItemName = styled.h2`
  font-size: 1.3rem;
`

export const ItemPrice = styled.p`
  font-size: 1rem;
  font-weight: bold;
`

export const FlexGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`
