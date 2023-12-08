import { Metadata } from 'next'
import { getUser } from '@/api/users/getUser'
import { decodeToken } from '@/auth/token/decode/cookies'
import Message from '@/components/feedback/message/Message'
import AddressForm from './form'

export const metadata: Metadata = {
  title: 'Address',
}

const Address = async () => {
  const { data: user, error } = await getUser()
  const session = await decodeToken()

  if (error) {
    return <Message variant='error'>{error}</Message>
  }

  if (!user) {
    return <Message variant='error'>User not found</Message>
  }

  return <AddressForm address={user.address} payload={session!.user} />
}

export default Address
