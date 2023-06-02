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
  justify-content: center;
  padding: 1.9rem;
`

export const SkeletonText = styled.div<Props>`
  width: ${({ $long }) => ($long ? '80%' : '50%')};
  height: 30px;
  background: var(--skeleton-background);
  border-radius: 5px;
  margin: 0.4rem 0;
`
