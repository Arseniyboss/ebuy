'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from '@hooks/useForm'
import { loginSchema } from '@validation/schemas/loginSchema'
import { login } from '@api/users/login'
import { Input } from '@styles/globals'
import {
  Form,
  FormGroup,
  FormButton,
  FormFooter,
  FormLink,
  FormError,
} from '@styles/form'
import Message from '@components/message/Message'

const Login = () => {
  const initialValues = {
    email: '',
    password: '',
  }

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()

  const onSubmit = async () => {
    setLoading(true)

    const response = await login(values)

    if (!response.ok) {
      setLoading(false)
      setError(response.statusText)
      return
    }

    router.push('/')
    router.refresh()
  }

  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues,
    onSubmit,
    validationSchema: loginSchema,
  })
  return (
    <Form onSubmit={handleSubmit} data-testid='login-form'>
      <h1>Sign In</h1>
      {error && <Message variant='error'>{error}</Message>}
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
      <FormButton disabled={loading} data-testid='login-button'>
        Sign In
      </FormButton>
      <FormFooter>
        <p>Don't have an account?</p>
        <FormLink href='/register' data-testid='register-link'>
          Sign Up
        </FormLink>
      </FormFooter>
    </Form>
  )
}

export default Login
