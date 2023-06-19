import styled from 'styled-components'
import { Input } from '@styles/globals'
import { breakpoints } from '@constants/breakpoints/home'

export const SearchInput = styled(Input)`
  width: 250px;
  padding: 0.6rem 1rem;
  border-radius: 1.3rem;

  @media screen and (max-width: ${breakpoints.small}) {
    width: 100%;
    border-radius: 0.3rem;
  }
`
