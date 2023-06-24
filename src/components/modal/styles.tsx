import styled, { keyframes } from 'styled-components'
import { FaTimes } from 'react-icons/fa'

const modal = keyframes`
  0% {
    transform: scale(0)
  } 
  100% {
    transform: scale(1) rotate(360deg)
  }
`

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: var(--modal-z-index);
`

export const ModalContainer = styled.div`
  height: 150px;
  width: 340px;
  background: white;
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  text-align: center;
  position: relative;
  animation: ${modal} 0.5s linear;
`

export const ModalHeading = styled.h2`
  color: red;
`

export const ModalText = styled.h3`
  color: green;
`

export const Cross = styled(FaTimes)`
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 1.5rem;
  color: #bb2525;
  cursor: pointer;
`
