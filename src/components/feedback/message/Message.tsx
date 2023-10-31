import { ReactNode } from 'react'
import { ErrorMessage, SuccessMessage, InfoMessage } from './styles'

type Props = {
  children: ReactNode
  variant: 'info' | 'success' | 'error'
  ariaLive?: boolean
}

const Message = ({ children, variant, ariaLive = true }: Props) => {
  return (
    <>
      {variant === 'info' && (
        <InfoMessage data-testid='info-message'>{children}</InfoMessage>
      )}
      {variant === 'success' && (
        <SuccessMessage data-testid='success-message' aria-live='assertive'>
          {children}
        </SuccessMessage>
      )}
      {variant === 'error' && (
        <ErrorMessage
          data-testid='error-message'
          aria-live={ariaLive ? 'assertive' : 'off'}
        >
          {children}
        </ErrorMessage>
      )}
    </>
  )
}

export default Message
