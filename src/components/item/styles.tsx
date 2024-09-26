'use client'

import styled from 'styled-components'
import Image from 'next/image'
import { breakpoints } from '@/constants/breakpoints'

export const Container = styled.article`
  display: flex;
  column-gap: 1.2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid lightgrey;

  @media screen and (max-width: ${breakpoints.cart.small}) {
    column-gap: 0.8rem;
  }
`

export const ItemImage = styled(Image)`
  border-radius: var(--border-radius);

  @media screen and (max-width: ${breakpoints.cart.small}) {
    width: 143px;
    height: auto;
  }
`

export const ItemDetails = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
`

export const ItemName = styled.h2`
  line-height: 1.2;
  font-size: 1.3rem;
  margin-top: -0.2em;

  @media screen and (max-width: ${breakpoints.cart.small}) {
    font-size: 1.1rem;
  }
`

export const ItemPrice = styled.p`
  font-size: 1rem;
  font-weight: bold;

  @media screen and (max-width: ${breakpoints.cart.small}) {
    font-size: 0.9rem;
  }
`

export const FlexGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
`
