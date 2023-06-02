'use client'

import styled from 'styled-components'

export const ProductContainer = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
`

export const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 1rem;
  margin-bottom: 2rem;

  @media screen and (max-width: 465px) {
    flex-direction: column;
    padding: 0 2rem;
    row-gap: 1.5rem;
  }
`

export const SearchFailText = styled.p`
  text-align: center;
`
