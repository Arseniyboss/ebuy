'use client'

import styled from 'styled-components'

export const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  max-width: 90vw;
  word-wrap: break-word;

  > *:last-child {
    margin-top: 1rem;
  }

  &:not(:last-of-type) {
    padding-bottom: 1rem;
    border-bottom: 1px solid lightgrey;
  }
`
