import { Metadata } from 'next'
import { getUser } from '@/api/users/getUser'
import ProfileForm from './form'
import Message from '@/components/feedback/message/Message'

export const metadata: Metadata = {
  title: 'Profile',
}

const Profile = async () => {
  const { data: user, error } = await getUser()

  if (error) {
    return <Message variant='error'>{error}</Message>
  }

  if (!user) {
    return <Message variant='error'>User not found</Message>
  }

  return <ProfileForm user={user} />
}

export default Profile
