import styled from 'styled-components'
import { breakpoints } from '@constants/breakpoints/home'

export const SearchInput = styled.input`
  outline: none;
  border: 1px solid darkgrey;
  border-radius: 1.3rem;
  font-size: 1rem;
  padding: 0.6rem 1rem;
  width: 250px;

  &:focus {
    border: 1px solid #444;
  }

  @media screen and (max-width: ${breakpoints.small}) {
    width: 100%;
    border-radius: 0.3rem;
  }
`
