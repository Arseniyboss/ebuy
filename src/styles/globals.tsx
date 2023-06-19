'use client'

import styled from 'styled-components'

export const Container = styled.main`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--gap);
`

export const Heading = styled.h1`
  color: var(--gray);
  text-align: center;
`

export const Button = styled.button`
  font-size: 1rem;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-image: linear-gradient(rgb(0 0 0 / 25%) 0 0);
  }

  &:disabled {
    pointer-events: none;
    cursor: initial;
    opacity: 0.5;
  }
`

export const Input = styled.input`
  outline: none;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  padding: 0.6rem 0.8rem;
  font-size: 1rem;

  &:focus {
    border: 1px solid #444;
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
