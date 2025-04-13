'use client'

import { useForm } from '@/hooks/useForm'
import { UpdateUserPasswordParams as Values } from '@/types/params'
import { validationSchema } from '@/validation/schemas/passwordSchema'
import { updateUserPassword } from '@/api/users/updateUserPassword'
import { Input } from '@/styles/globals'
import { Form, FormGroup, FormButton, FormError } from '@/styles/form'
import Message from '@/components/feedback/message/Message'

const ChangePasswordForm = () => {
  const initialValues: Values = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  }

  const onSubmit = async () => {
    const { error } = await updateUserPassword(values)
    if (error) return error
  }

  const { values, errors, error, loading, success, isValid, handleChange, handleSubmit } =
    useForm({
      initialValues,
      onSubmit,
      validationSchema,
    })
  return (
    <Form onSubmit={handleSubmit} data-testid="password-form">
      <h1>Change Password</h1>
      {error && <Message variant="error">{error}</Message>}
      {success && <Message variant="success">Password Updated</Message>}
      <FormGroup>
        <label htmlFor="currentPassword">Current Password</label>
        <Input
          type="password"
          name="currentPassword"
          id="currentPassword"
          value={values.currentPassword}
          onChange={handleChange}
          autoComplete="on"
          aria-invalid={!!errors.currentPassword}
          aria-describedby={errors.currentPassword && 'current-password-error'}
          data-testid="current-password-input"
        />
        {errors.currentPassword && (
          <FormError
            id="current-password-error"
            aria-live="assertive"
            data-testid="current-password-error"
          >
            {errors.currentPassword}
          </FormError>
        )}
      </FormGroup>
      <FormGroup>
        <label htmlFor="newPassword">New Password</label>
        <Input
          type="password"
          name="newPassword"
          id="newPassword"
          value={values.newPassword}
          onChange={handleChange}
          autoComplete="on"
          aria-invalid={!!errors.newPassword}
          aria-describedby={errors.newPassword && 'new-password-error'}
          data-testid="new-password-input"
        />
        {errors.newPassword && (
          <FormError
            id="new-password-error"
            aria-live="assertive"
            data-testid="new-password-error"
          >
            {errors.newPassword}
          </FormError>
        )}
      </FormGroup>
      <FormGroup>
        <label htmlFor="confirmNewPassword">Confirm New Password</label>
        <Input
          type="password"
          name="confirmNewPassword"
          id="confirmNewPassword"
          value={values.confirmNewPassword}
          onChange={handleChange}
          autoComplete="on"
          aria-invalid={!!errors.confirmNewPassword}
          aria-describedby={errors.confirmNewPassword && 'confirm-new-password-error'}
          data-testid="confirm-new-password-input"
        />
        {errors.confirmNewPassword && (
          <FormError
            id="confirm-new-password-error"
            aria-live="assertive"
            data-testid="confirm-new-password-error"
          >
            {errors.confirmNewPassword}
          </FormError>
        )}
      </FormGroup>
      <FormButton disabled={!isValid || loading}>Update</FormButton>
    </Form>
  )
}

export default ChangePasswordForm
