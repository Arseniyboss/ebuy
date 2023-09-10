'use client'

import styled, { keyframes } from 'styled-components'

const loader = keyframes`
  100% {
    transform: rotate(360deg)
  }
`

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const Loader = styled.div`
  --size: 150px;
  height: var(--size);
  width: var(--size);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  animation: ${loader} 1s infinite linear;
`

export const RainbowLoader = styled(Loader)`
  background: conic-gradient(
    hsl(360, 100%, 50%),
    hsl(315, 100%, 50%),
    hsl(270, 100%, 50%),
    hsl(225, 100%, 50%),
    hsl(180, 100%, 50%),
    hsl(135, 100%, 50%),
    hsl(90, 100%, 50%),
    hsl(45, 100%, 50%),
    hsl(0, 100%, 50%)
  );
`

export const StripeLoader = styled(Loader)`
  background: linear-gradient(to right, #1fa2ff, #12d8fa, #a6ffcb);
`

export const PrimaryLoader = styled(Loader)`
  background: linear-gradient(
    135deg,
    #feed07 0%,
    #fe6a50 5%,
    #ed00aa 15%,
    #2fe3fe 50%,
    #8900ff 100%
  );
`

export const TransparentCircle = styled.div`
  --size: 130px;
  height: var(--size);
  width: var(--size);
  background: white;
  border-radius: 50%;
`
