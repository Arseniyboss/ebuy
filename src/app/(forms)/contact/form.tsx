'use client'

import { useForm } from '@hooks/useForm'
import { User } from 'types/api'
import { Values, validationSchema } from '@validation/schemas/contactSchema'
import { Input } from '@styles/globals'
import { Form, FormGroup, FormButton, FormError } from '@styles/form'
import Message from '@components/feedback/message/Message'

type Props = {
  user?: User
}

const ContactForm = ({ user }: Props) => {
  const initialValues: Values = {
    name: user?.name || '',
    email: user?.email || '',
    message: '',
  }

  const onSubmit = async () => {
    await fetch('https://formspree.io/f/xwkylwdy', {
      method: 'POST',
      body: JSON.stringify(values),
      mode: 'no-cors',
    })
    setValues({ ...values, message: '' })
  }

  const {
    values,
    errors,
    loading,
    success,
    isValid,
    setValues,
    handleChange,
    handleSubmit,
  } = useForm({
    initialValues,
    onSubmit,
    validationSchema,
  })
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
            aria-required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name && 'name-error'}
            data-testid='name-input'
          />
          {errors.name && (
            <FormError
              id='name-error'
              aria-live='polite'
              data-testid='name-error'
            >
              {errors.name}
            </FormError>
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
            aria-required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email && 'email-error'}
            data-testid='email-input'
          />
          {errors.email && (
            <FormError
              id='email-error'
              aria-live='polite'
              data-testid='email-error'
            >
              {errors.email}
            </FormError>
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
            aria-required
            aria-describedby={errors.message && 'message-error'}
            data-testid='message-input'
          />
          {errors.message && (
            <FormError
              id='message-error'
              aria-live='polite'
              data-testid='message-error'
            >
              {errors.message}
            </FormError>
          )}
        </FormGroup>
        <FormButton disabled={!isValid || loading} data-testid='submit-button'>
          Submit
        </FormButton>
      </Form>
    </>
  )
}

export default ContactForm
