'use client'

import { useRouter } from 'next/navigation'
import { useForm } from '@hooks/useForm'
import { Values, validationSchema } from '@validation/schemas/registerSchema'
import { register } from '@api/users/register'
import { Input } from '@styles/globals'
import {
  Form,
  FormGroup,
  FormButton,
  FormFooter,
  FormLink,
  FormError,
} from '@styles/form'
import Message from '@components/feedback/message/Message'

const Register = () => {
  const initialValues: Values = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  const router = useRouter()

  const onSubmit = async () => {
    const response = await register(values)
    if (!response.ok) return response.statusText
    router.push('/')
    router.refresh()
  }

  const {
    values,
    errors,
    error,
    isSubmitted,
    isValid,
    handleChange,
    handleSubmit,
  } = useForm({
    initialValues,
    onSubmit,
    validationSchema,
  })
  return (
    <Form onSubmit={handleSubmit} data-testid='register-form'>
      <h1>Sign Up</h1>
      {error && <Message variant='error'>{error}</Message>}
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
        <label htmlFor='password'>Password</label>
        <Input
          type='password'
          name='password'
          id='password'
          value={values.password}
          onChange={handleChange}
          autoComplete='on'
          data-testid='password-input'
        />
        {errors.password && (
          <FormError data-testid='password-error'>{errors.password}</FormError>
        )}
      </FormGroup>
      <FormGroup>
        <label htmlFor='confirmPassword'>Confirm Password</label>
        <Input
          type='password'
          name='confirmPassword'
          id='confirmPassword'
          value={values.confirmPassword}
          onChange={handleChange}
          autoComplete='on'
          data-testid='confirm-password-input'
        />
        {errors.confirmPassword && (
          <FormError data-testid='confirm-password-error'>
            {errors.confirmPassword}
          </FormError>
        )}
      </FormGroup>
      <FormButton
        disabled={!isValid || isSubmitted}
        data-testid='register-button'
      >
        Sign Up
      </FormButton>
      <FormFooter>
        <p>Have an Account?</p>
        <FormLink href='/login' data-testid='login-link'>
          Sign In
        </FormLink>
      </FormFooter>
    </Form>
  )
}

export default Register