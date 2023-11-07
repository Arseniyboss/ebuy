'use client'

import styled from 'styled-components'
import { breakpoints } from '@/constants/breakpoints'
import Image from 'next/image'
import { Button } from '@/styles/globals'

export const ProductContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
`

export const FlexGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  @media screen and (max-width: ${breakpoints.home.small}) {
    flex-direction: column;
    padding: 0 2rem;
  }
`

export const SearchFailText = styled.p`
  text-align: center;
`

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  gap: var(--gap);
  color: var(--gray);

  h1 {
    font-size: 1.7rem;
  }
`

export const NotFoundImage = styled(Image)`
  max-width: 90vw;
  height: auto;
`

export const HomeButton = styled(Button)`
  background-color: black;
  padding: 0.8rem 1.6rem;
  font-size: 1.2rem;
  border-radius: var(--border-radius);
`
