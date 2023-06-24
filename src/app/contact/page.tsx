import { getUser } from '@api/users/getUser'
import ContactForm from './form'

const Contact = async () => {
  const user = await getUser()

  return <ContactForm user={user} />
}

export default Contact
