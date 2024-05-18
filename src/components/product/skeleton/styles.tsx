'use client'

import styled, { keyframes } from 'styled-components'

type Props = {
  $long?: boolean
}

const loading = keyframes`
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
`

export const SkeletonContainer = styled.div`
  animation: ${loading} 1.5s linear infinite;
  border-radius: var(--border-radius);
  overflow: hidden;
`

export const SkeletonCard = styled.div`
  background: var(--skeleton-background);
  aspect-ratio: 1.25 / 1;
`

export const SkeletonBody = styled.div`
  background: lightgrey;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2.2rem;
`

export const SkeletonText = styled.div<Props>`
  background: var(--skeleton-background);
  border-radius: var(--border-radius);
  width: ${({ $long }) => ($long ? '80%' : '50%')};
  padding: 1rem;
`
