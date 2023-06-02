import styled from 'styled-components'

export const SearchInput = styled.input`
  outline: none;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 1rem;
  padding: 0.6rem 1rem;
  width: 250px;

  &:focus {
    border: 1px solid #444;
  }

  @media screen and (max-width: 465px) {
    width: 100%;
  }
`
