import styled from 'styled-components'
import { Select } from '@/styles/globals'
import { breakpoints } from '@/constants/breakpoints'

export const SortSelect = styled(Select)`
  min-width: 160px;
  @media screen and (max-width: ${breakpoints.home.small}) {
    justify-content: start;
    text-align: start; // fallback in case base-select is not supported
    text-align-last: start; // fallback in case base-select is not supported
    width: 100%;
    border-radius: 0.3rem;
    padding: 0.7rem 1rem;
  }
`
