'use client'

import styled from 'styled-components'
import Image from 'next/image'
import { Button } from '@styles/globals'

export const ProductContainer = styled.article`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 4rem 2rem;

  /* @media screen and (max-width: 1098px) {
    justify-content: flex-start;
  } */
`

export const ProductGroup = styled.div`
  display: flex;
  gap: 2rem;
`

export const ProductImage = styled(Image)`
  height: auto;
  width: 450px;
`

export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 500px; */
  width: 33vw;
  gap: 1rem;
  color: var(--primary-color);
`

export const ProductDescription = styled.p`
  width: 90%;
`

export const ProductSummary = styled.div`
  table {
    border-collapse: collapse;
    color: var(--primary-color);
  }

  th {
    text-align: left;
  }

  td,
  th {
    padding: 1rem;
  }

  table,
  td,
  th {
    border: 1px solid lightgrey;
  }

  /* @media screen and (max-width: 1098px) {
    align-self: flex-start;
  } */
`

export const ProductQuantity = styled.select`
  width: 70%;
  color: inherit;
  border-radius: var(--border-radius);
`

export const ProductButton = styled(Button)`
  background: var(--primary-color);
  color: white;
  width: 100%;
  padding: 1rem;
  text-transform: uppercase;

  &:hover {
    background: #333;
    transition: all 0.3s ease;
  }

  &:disabled {
    background: lightgrey;
  }
`
