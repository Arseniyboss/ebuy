import { notFound } from 'next/navigation'
import { getUser } from '@api/users/getUser'
import ProfileForm from './form'

const Profile = async () => {
  const user = await getUser()

  if (!user) {
    return notFound()
  }

  return <ProfileForm user={user} />
}

export default Profile
