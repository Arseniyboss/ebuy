import { ReactNode } from 'react'
import { ErrorMessage, SuccessMessage, InfoMessage } from './styles'

type Props = {
  children: ReactNode
  variant: 'info' | 'success' | 'error'
}

const Message = ({ children, variant }: Props) => {
  return (
    <>
      {variant === 'info' && <InfoMessage>{children}</InfoMessage>}
      {variant === 'success' && <SuccessMessage>{children}</SuccessMessage>}
      {variant === 'error' && <ErrorMessage>{children}</ErrorMessage>}
    </>
  )
}

export default Message
