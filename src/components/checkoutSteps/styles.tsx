import styled from 'styled-components'
import Link from 'next/link'

type ContainerProps = {
  $center?: boolean
}

type NavLinkProps = {
  disabled?: boolean
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: ${({ $center }) => ($center ? 'center' : 'space-between')};
  gap: ${({ $center }) => $center && '1rem'};
`

export const NavLink = styled(Link)<NavLinkProps>`
  color: ${({ disabled }) => disabled && 'lightgrey'};
  pointer-events: ${({ disabled }) => disabled && 'none'};
`
