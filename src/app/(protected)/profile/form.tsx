'use client'

import { useRouter } from 'next/navigation'
import { useForm } from '@/hooks/useForm'
import { UpdateUserParams as Values } from '@/types/params'
import { User } from '@/types/api'
import { validationSchema } from '@/validation/schemas/profileSchema'
import { updateUser } from '@/api/users/updateUser'
import { Input } from '@/styles/globals'
import { Form, FormGroup, FormButton, FormError } from '@/styles/form'
import Message from '@/components/feedback/message/Message'

type Props = {
  user: User
}

const ProfileForm = ({ user }: Props) => {
  const initialValues: Values = {
    name: user.name,
    email: user.email,
  }

  const router = useRouter()

  const onSubmit = async () => {
    const { error } = await updateUser(values)
    if (error) return error
    router.refresh()
  }

  const { values, errors, error, loading, success, isValid, handleChange, handleSubmit } =
    useForm({
      initialValues,
      onSubmit,
      validationSchema,
    })
  return (
    <Form onSubmit={handleSubmit} data-testid="profile-form">
      <h1>User Profile</h1>
      {error && <Message variant="error">{error}</Message>}
      {success && <Message variant="success">Profile Updated</Message>}
      <FormGroup>
        <label htmlFor="name">Name</label>
        <Input
          type="text"
          name="name"
          id="name"
          value={values.name}
          onChange={handleChange}
          autoComplete="on"
          aria-required
          aria-invalid={!!errors.name}
          aria-describedby={errors.name && 'name-error'}
          data-testid="name-input"
        />
        {errors.name && (
          <FormError id="name-error" aria-live="assertive" data-testid="name-error">
            {errors.name}
          </FormError>
        )}
      </FormGroup>
      <FormGroup>
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          name="email"
          id="email"
          value={values.email}
          onChange={handleChange}
          autoComplete="on"
          aria-required
          aria-invalid={!!errors.email}
          aria-describedby={errors.email && 'email-error'}
          data-testid="email-input"
        />
        {errors.email && (
          <FormError id="email-error" aria-live="assertive" data-testid="email-error">
            {errors.email}
          </FormError>
        )}
      </FormGroup>
      <FormButton disabled={!isValid || loading} data-testid="update-button">
        Update
      </FormButton>
    </Form>
  )
}

export default ProfileForm
