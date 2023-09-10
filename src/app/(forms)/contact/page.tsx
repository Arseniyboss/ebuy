import { Metadata } from 'next'
import { getUser } from '@api/users/getUser'
import ContactForm from './form'

export const metadata: Metadata = {
  title: 'Contact',
}

const Contact = async () => {
  const user = await getUser()

  return <ContactForm user={user} />
}

export default Contact
