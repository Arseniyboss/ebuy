import { ReactNode } from 'react'
import { ErrorMessage, SuccessMessage, InfoMessage } from './styles'

type Props = {
  children: ReactNode
  variant: 'info' | 'success' | 'error'
}

const Message = ({ children, variant }: Props) => {
  return (
    <>
      {variant === 'info' && (
        <InfoMessage data-testid='info-message'>{children}</InfoMessage>
      )}
      {variant === 'success' && (
        <SuccessMessage data-testid='success-message'>
          {children}
        </SuccessMessage>
      )}
      {variant === 'error' && (
        <ErrorMessage data-testid='error-message'>{children}</ErrorMessage>
      )}
    </>
  )
}

export default Message
