import Message from '@components/message/Message'

const NotFound = () => {
  return (
    <Message variant='error' data-testid='error-message'>
      Product not found
    </Message>
  )
}

export default NotFound
