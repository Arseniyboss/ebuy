import { ReactNode } from 'react'
import { ErrorMessage, SuccessMessage, InfoMessage } from './styles'

type Props = {
  children: ReactNode
  variant: 'info' | 'success' | 'error'
  dynamic?: boolean
}

const Message = ({ children, variant, dynamic }: Props) => {
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
        <ErrorMessage
          data-testid='error-message'
          aria-live={dynamic ? 'polite' : 'off'}
        >
          {children}
        </ErrorMessage>
      )}
    </>
  )
}

export default Message
