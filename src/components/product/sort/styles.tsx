import styled from 'styled-components'
import { Select } from '@/styles/globals'
import { breakpoints } from '@/constants/breakpoints'

export const SortSelect = styled(Select)`
  @media screen and (max-width: ${breakpoints.home.small}) {
    text-align: start;
    text-align-last: start;
    width: 100%;
    border-radius: 0.3rem;
    padding: 0.7rem 1rem;
  }
`
