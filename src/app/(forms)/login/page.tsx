'use client'

import { useRouter } from 'next/navigation'
import { useForm } from '@hooks/useForm'
import { UserLoginParams as Values } from 'types/params'
import { validationSchema } from '@validation/schemas/loginSchema'
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
import Message from '@components/feedback/message/Message'

const Login = () => {
  const initialValues: Values = {
    email: '',
    password: '',
  }

  const router = useRouter()

  const onSubmit = async () => {
    const response = await login(values)
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
          aria-required
          aria-invalid={!!errors.email}
          aria-describedby={errors.email && 'email-error'}
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
      <FormButton disabled={!isValid || isSubmitted} data-testid='login-button'>
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