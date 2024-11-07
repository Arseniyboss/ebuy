'use client'

import styled, { keyframes } from 'styled-components'

const loading = keyframes`
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`

export const SkeletonContainer = styled.div`
  animation: ${loading} 2s linear infinite;
  animation-delay: 0.2s;
  border-radius: var(--border-radius);
  overflow: hidden;
`

export const SkeletonCard = styled.div`
  background: #ddd;
  aspect-ratio: 1.25;
`

export const SkeletonBody = styled.div`
  background: #eee;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2.2rem;
`

export const SkeletonText = styled.div`
  background: #ddd;
  border-radius: var(--border-radius);
  width: 100%;
  padding: 1rem;

  &:last-child {
    width: 70%;
  }
`
