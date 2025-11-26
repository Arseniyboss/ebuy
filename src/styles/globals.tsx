'use client'

import styled from 'styled-components'

export const Container = styled.main`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  margin: var(--gap) 0;
`

export const PageContainer = styled.div`
  width: 1200px;
  max-width: 90vw;
  margin: 0 auto;
  color: var(--gray);
`

export const FlexGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const Heading = styled.h1`
  color: var(--gray);
  text-align: center;
`

export const Button = styled.button`
  font-size: 1rem;
  color: white;

  &:hover {
    background-image: linear-gradient(rgb(0 0 0 / 25%) 0 0);
  }

  &:disabled {
    pointer-events: none;
    cursor: initial;
    opacity: 0.5;
  }
`

export const InvisibleButton = styled.button`
  background: none;
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
  display: inherit;
`

export const Input = styled.input`
  outline: none;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  padding: 0.6rem 0.8rem;
  font-size: 1rem;

  &:focus {
    border: 1px solid #aaa;
  }
`

export const Select = styled.select`
  border: 1px solid #ddd;
  border-radius: 2rem;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  text-align: center;
  text-align-last: center; // for safari and chrome on ios

  &:focus {
    border: 1px solid #aaa;
  }
`

export const ProductPrice = styled.p`
  font-size: 1.3rem;
`

export const ProductQuantity = styled.select`
  width: 40px;
  color: inherit;
  border: 1px solid grey;
  border-radius: var(--border-radius);
  appearance: base-select;
  text-align: center;
  text-align-last: center; // for safari and chrome on ios
  padding: 0.1rem;

  &:focus {
    outline: auto;
  }
`

export const SkipLink = styled.a`
  outline: none;
  background: #333;
  color: white;
  text-align: center;
  padding: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  translate: 0 -100%;
  transition: translate 150ms ease-in-out;
  z-index: var(--skip-link-z-index);

  &:focus {
    translate: 0;
  }
`
