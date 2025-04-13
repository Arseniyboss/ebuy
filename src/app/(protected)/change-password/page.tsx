import { Metadata } from 'next'
import { getUser } from '@/api/users/getUser'
import ChangePasswordForm from './form'
import Message from '@/components/feedback/message/Message'

export const metadata: Metadata = {
  title: 'Change Password',
}

const ChangePassword = async () => {
  const { data: user, error } = await getUser()

  if (error) {
    return <Message variant="error">{error}</Message>
  }

  if (!user) {
    return <Message variant="error">User not found</Message>
  }

  return <ChangePasswordForm />
}

export default ChangePassword
