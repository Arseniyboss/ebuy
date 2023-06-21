import styled from 'styled-components'
import { Button } from '@styles/globals'

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  color: var(--gray);
`

export const PaginationButton = styled(Button)`
  display: flex;
  background: #8ccaf8;
  padding: 0.4rem;
  border-radius: var(--border-radius);
`
