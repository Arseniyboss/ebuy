'use client'

import { useState } from 'react'
import { useForm } from '@hooks/useForm'
import { User } from 'types/user'
import { contactSchema } from '@validation/schemas/contactSchema'
import { Input } from '@styles/globals'
import { Form, FormGroup, FormButton, FormError } from '@styles/form'
import Modal from '@components/modal/Modal'

type Props = {
  user?: User
}

const ContactForm = ({ user }: Props) => {
  const initialValues = {
    name: user?.name || '',
    email: user?.email || '',
    message: '',
  }

  const [success, setSuccess] = useState(false)

  const onSubmit = () => {
    // fetch('https://formspree.io/f/xwkylwdy', {
    //   method: 'POST',
    //   body: JSON.stringify(values),
    //   mode: 'no-cors',
    // })
    setValues({ ...values, message: '' })
    setSuccess(true)
  }

  const { values, setValues, errors, handleChange, handleSubmit } = useForm({
    initialValues,
    onSubmit,
    validationSchema: contactSchema,
  })

  return (
    <>
      {success && <Modal setSuccess={setSuccess} />}
      <Form onSubmit={handleSubmit} data-testid='contact-form'>
        <h1>Contact Us</h1>
        <FormGroup>
          <label htmlFor='name'>Name</label>
          <Input
            type='text'
            name='name'
            id='name'
            value={values.name}
            onChange={handleChange}
            autoComplete='on'
            data-testid='name-input'
          />
          {errors.name && (
            <FormError data-testid='name-error'>{errors.name}</FormError>
          )}
        </FormGroup>
        <FormGroup>
          <label htmlFor='email'>Email</label>
          <Input
            type='email'
            name='email'
            id='email'
            value={values.email}
            onChange={handleChange}
            autoComplete='on'
            data-testid='email-input'
          />
          {errors.email && (
            <FormError data-testid='email-error'>{errors.email}</FormError>
          )}
        </FormGroup>
        <FormGroup>
          <label htmlFor='message'>Message</label>
          <Input
            name='message'
            id='message'
            as='textarea'
            rows={5}
            value={values.message}
            onChange={handleChange}
            data-testid='message-input'
          />
          {errors.message && (
            <FormError data-testid='message-error'>{errors.message}</FormError>
          )}
        </FormGroup>
        <FormButton>Submit</FormButton>
      </Form>
    </>
  )
}

export default ContactForm
