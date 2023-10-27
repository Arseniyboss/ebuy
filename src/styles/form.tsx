import styled from 'styled-components'
import Link from 'next/link'
import { Button } from '@/styles/globals'

type Props = {
  $center?: boolean
}

export const Form = styled.form<Props>`
  --spacing: 1.3rem;
  display: flex;
  flex-direction: column;
  gap: var(--spacing);
  width: 340px;
  padding: 2rem;
  margin: ${({ $center = true }) => ($center ? 'auto' : 0)};
  color: var(--gray);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);

  fieldset {
    border: 0;
    display: flex;
    flex-direction: column;
    gap: inherit;
  }

  legend {
    margin-bottom: var(--spacing);
  }
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`

export const FormRadio = styled.input`
  margin-right: 0.5rem;
  cursor: pointer;
`

export const FormButton = styled(Button)`
  background-color: var(--blue);
  padding: 0.6rem 1rem;
  border-radius: 2rem;
  letter-spacing: 1px;
  align-self: flex-start;
`

export const FormFooter = styled.div`
  display: flex;
  gap: 1rem;
`

export const FormLink = styled(Link)`
  color: var(--blue);
`

export const FormError = styled.p`
  color: var(--red);
  font-weight: bold;
`
