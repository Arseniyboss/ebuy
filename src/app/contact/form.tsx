'use client'

import { useState, useEffect } from 'react'
import { useForm } from '@hooks/useForm'
import { useTimeout } from '@hooks/useTimeout'
import { User } from 'types/api'
import { validationSchema } from '@validation/schemas/contactSchema'
import { Input } from '@styles/globals'
import { Form, FormGroup, FormButton, FormError } from '@styles/form'
import Message from '@components/message/Message'

type Props = {
  user?: User
}

const ContactForm = ({ user }: Props) => {
  const initialValues = {
    name: user?.name || '',
    email: user?.email || '',
    message: '',
  }

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const onSubmit = async () => {
    setLoading(true)
    setSuccess(false)

    await fetch('https://formspree.io/f/xwkylwdy', {
      method: 'POST',
      body: JSON.stringify(values),
      mode: 'no-cors',
    })

    setLoading(false)
    setSuccess(true)
    setValues({ ...values, message: '' })
  }

  const { values, setValues, errors, handleChange, handleSubmit } = useForm({
    initialValues,
    onSubmit,
    validationSchema,
  })

  useTimeout(
    () => {
      if (success) {
        setSuccess(false)
      }
    },
    3000,
    [success]
  )

  useEffect(() => {
    setSuccess(false)
  }, [errors])

  return (
    <>
      <Form onSubmit={handleSubmit} data-testid='contact-form'>
        <h1>Contact Us</h1>
        {success && <Message variant='success'>Message Sent</Message>}
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
        <FormButton disabled={loading} data-testid='submit-button'>
          Submit
        </FormButton>
      </Form>
    </>
  )
}

export default ContactForm
