'use client'

import styled from 'styled-components'
import Link from 'next/link'

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

export const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  gap: 1.3rem;
`

export const NavLink = styled(Link)`
  display: flex;
  font-size: var(--header-icon-size);

  &:hover {
    color: var(--darkgray);
  }
`
