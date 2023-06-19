'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@api/users/login'
import { Input } from '@styles/globals'
import { Form, FormGroup, FormButton, FormFooter, FormLink } from '@styles/form'
import Message from '@components/message/Message'

// add form validation

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const response = await login({ email, password })
    if (!response.ok) {
      setLoading(false)
      setError(response.statusText)
      return
    }

    router.push('/')
    router.refresh()
  }
  return (
    <Form onSubmit={handleSubmit}>
      <h1>Sign In</h1>
      {error && <Message variant='error'>{error}</Message>}
      <FormGroup>
        <label htmlFor='email'>Email</label>
        <Input
          type='email'
          name='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete='on'
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor='password'>Password</label>
        <Input
          type='password'
          name='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete='on'
        />
      </FormGroup>
      <FormButton disabled={loading}>Sign In</FormButton>
      <FormFooter>
        <p>Don't have an account?</p>
        <FormLink href='/register'>Sign Up</FormLink>
      </FormFooter>
    </Form>
  )
}

export default Login
