'use client'

import styled from 'styled-components'

export const Container = styled.main`
  flex: 1 0 auto;
`

export const Heading = styled.h1`
  color: var(--primary-color);
  text-align: center;
  margin: 1.5rem 0;
`

export const Button = styled.button`
  border: none;
  cursor: pointer;

  &:disabled {
    cursor: initial;
  }
`

export const SkipLink = styled.a`
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

// export const FormContainer = styled.div`
//   min-height: 75vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `
