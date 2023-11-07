import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getUser } from '@/api/users/getUser'
import { decodeToken } from '@/auth/token/decode/cookies'
import AddressForm from './form'

export const metadata: Metadata = {
  title: 'Address',
}

const Address = async () => {
  const user = await getUser()
  const session = await decodeToken()

  if (!user) {
    return notFound()
  }

  return <AddressForm address={user.address} payload={session!.user} />
}

export default Address
