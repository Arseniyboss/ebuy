import styled from 'styled-components'

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
`

export const PaginationButton = styled.button`
  display: flex;
  border: none;
  background: #8ccaf8;
  color: white;
  padding: 0.4rem;
  border-radius: 0.25rem;
  cursor: pointer;

  &:disabled {
    cursor: initial;
    opacity: 0.6;
  }
`
