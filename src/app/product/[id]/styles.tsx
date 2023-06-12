'use client'

import styled from 'styled-components'
import Image from 'next/image'
import { Button } from '@styles/globals'
import { breakpoints } from '@constants/breakpoints/product'

export const ProductContainer = styled.article`
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 3rem 2rem;

  @media screen and (max-width: ${breakpoints.medium}) {
    flex-wrap: wrap;
    gap: 1rem;
    padding: 2rem;
  }
`

export const ProductImage = styled(Image)`
  max-width: 90vw;

  @media screen and (max-width: ${breakpoints.medium}) {
    height: auto;
  }
`

export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  color: var(--primary-color);

  @media screen and (max-width: ${breakpoints.medium}) {
    align-items: center;
    text-align: center;
  }
`

export const ProductName = styled.h1`
  font-size: 1.8rem;
`

export const ProductQuantity = styled.select`
  width: 40px;
  color: inherit;
  border-radius: var(--border-radius);
`

export const ProductButton = styled(Button)`
  border-radius: var(--border-radius);
  background: var(--primary-color);
  color: white;
  width: fit-content;
  padding: 0.8rem 1.2rem;
  text-transform: uppercase;

  &:hover {
    background: #333;
    transition: all 0.3s ease;
  }

  &:disabled {
    background: lightgrey;
  }
`

export const ProductStatus = styled.p`
  color: red;
  font-size: 1.2rem;
`
