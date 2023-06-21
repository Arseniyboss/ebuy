import styled from 'styled-components'
import Link from 'next/link'

type Props = {
  pathname: string
}

export const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  gap: 1.3rem;
`

export const NavLink = styled(Link)<Props>`
  display: flex;
  font-size: var(--header-icon-size);
  color: ${({ href, pathname }) => href === pathname && 'var(--darkgray)'};

  &:hover {
    color: var(--darkgray);
  }
`
