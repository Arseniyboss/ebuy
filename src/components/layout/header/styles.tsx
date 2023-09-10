'use client'

import styled from 'styled-components'

export const HeaderContainer = styled.header`
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  padding: 1.5rem 2rem;
  box-shadow: var(--box-shadow);
  color: var(--gray);
  z-index: var(--header-z-index);
`
