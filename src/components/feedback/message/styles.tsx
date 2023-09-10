'use client'

import styled from 'styled-components'

export const Message = styled.p`
  font-size: 1.2rem;
  padding: 1rem;
`

export const InfoMessage = styled(Message)`
  background: #d2ebf5;
  color: #10516c;
`

export const SuccessMessage = styled(Message)`
  background: #d4edda;
  color: #155724;
`

export const ErrorMessage = styled(Message)`
  background: #f8d7da;
  color: #721c24;
`
