'use client'

import styled from 'styled-components'
import Image from 'next/image'

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2rem;

  &:not(:last-of-type) {
    padding-bottom: 1.3rem;
    border-bottom: 1px solid lightgrey;
  }
`

export const ItemImage = styled(Image)`
  border-radius: var(--border-radius);
`

export const ItemName = styled.h2`
  width: 300px;
  max-width: 80vw;
  font-size: 1.2rem;
`

export const ItemPrice = styled.p`
  width: 70px;
`

export const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`
