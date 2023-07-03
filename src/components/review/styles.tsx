'use client'

import styled from 'styled-components'

export const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding-top: 1rem;
  border-top: 1px solid lightgrey;

  &:first-of-type {
    padding-top: 0;
    border-top: 0;
  }
`

export const ReviewComment = styled.p`
  margin-top: 1rem;
`
