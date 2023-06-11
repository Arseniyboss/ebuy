import styled from 'styled-components'
import { breakpoints } from '@constants/breakpoints/home'

export const Select = styled.select`
  border: 1px solid darkgrey;
  border-radius: 1rem;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  text-align: center;
  appearance: none;

  @media screen and (max-width: ${breakpoints.small}) {
    text-align: start;
    width: 100%;
    border-radius: 0.3rem;
    padding: 0.7rem 1rem;
  }
`
