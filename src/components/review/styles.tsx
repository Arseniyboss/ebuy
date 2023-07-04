'use client'

import styled from 'styled-components'

export const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  &:not(:last-of-type) {
    padding-bottom: 1rem;
    border-bottom: 1px solid lightgrey;
  }
`

export const ReviewComment = styled.p`
  margin-top: 1rem;
  max-width: 90vw;
  word-wrap: break-word;
`
