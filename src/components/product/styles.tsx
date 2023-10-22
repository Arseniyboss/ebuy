'use client'

import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'

export const ProductLink = styled(Link)`
  display: inherit;
`

export const ProductContainer = styled.article`
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius);
  overflow: hidden;
`

export const ProductImage = styled(Image)`
  width: 100%;
  height: auto;
`

export const ProductDetails = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  padding-top: 0.7rem;
  color: var(--gray);
`
