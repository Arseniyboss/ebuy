import styled from 'styled-components'
import Link from 'next/link'

type NavLinksProps = {
  $center?: boolean
}

type NavLinkProps = {
  disabled?: boolean
}

export const NavLinks = styled.ul<NavLinksProps>`
  display: flex;
  justify-content: ${({ $center }) => ($center ? 'center' : 'space-between')};
  gap: ${({ $center }) => $center && '1rem'};
`

export const NavLink = styled(Link)<NavLinkProps>`
  color: ${({ disabled }) => (disabled ? 'lightgrey' : 'var(--gray)')};
  pointer-events: ${({ disabled }) => disabled && 'none'};
`
