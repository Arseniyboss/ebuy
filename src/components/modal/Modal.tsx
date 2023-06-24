import {
  useEffect,
  useRef,
  useCallback,
  MouseEvent,
  Dispatch,
  SetStateAction,
} from 'react'
import {
  ModalWrapper,
  ModalContainer,
  ModalHeading,
  ModalText,
  Cross,
} from './styles'

type Props = {
  setSuccess: Dispatch<SetStateAction<boolean>>
}

const Modal = ({ setSuccess }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null)

  const closeModal = useCallback(() => {
    setSuccess(false)
  }, [setSuccess])

  const closeModalOnOutside = (e: MouseEvent) => {
    if (modalRef.current === e.target) {
      closeModal()
    }
  }

  const closeModalOnKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    },
    [closeModal]
  )

  useEffect(() => {
    document.addEventListener('keydown', closeModalOnKeyPress)
    return () => document.removeEventListener('keydown', closeModalOnKeyPress)
  }, [closeModalOnKeyPress])
  return (
    <ModalWrapper
      ref={modalRef}
      onClick={closeModalOnOutside}
      data-testid='modal'
    >
      <ModalContainer>
        <ModalHeading>Thanks for contacting us!</ModalHeading>
        <ModalText>We will reply ASAP</ModalText>
        <Cross onClick={closeModal} data-testid='modal-close-button' />
      </ModalContainer>
    </ModalWrapper>
  )
}

export default Modal
