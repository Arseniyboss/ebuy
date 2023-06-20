import styled from 'styled-components'

export const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const UserInitials = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--header-icon-size);
  width: var(--header-icon-size);
  background: var(--gray);
  color: white;
  border-radius: 50%;
  text-transform: capitalize;
  cursor: pointer;
`

export const Dropdown = styled.ul`
  position: absolute;
  background: white;
  color: var(--blue);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  font-weight: bold;
  margin-top: 3rem;
  border-radius: 10px;
  overflow: hidden;
`

export const DropdownText = styled.p`
  padding: 0.3rem 0.6rem;
  cursor: pointer;

  &:hover {
    background: lightgrey;
    color: #303545;
  }
`
