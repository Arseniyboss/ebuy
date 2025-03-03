import { validate } from '@/validation/validate'
import { validationSchema } from '@/validation/schemas/registerSchema'
import {
  USERNAME_REQUIRED,
  USERNAME_INVALID,
  EMAIL_REQUIRED,
  EMAIL_INVALID,
  PASSWORD_REQUIRED,
  PASSWORD_INVALID,
  PASSWORDS_DIFFERENT,
} from '@/validation/constants/errors'

describe('validates form values', () => {
  it('returns errors for empty values', () => {
    const values = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }

    const errors = validate(values, validationSchema)

    expect(errors.name).toBe(USERNAME_REQUIRED)
    expect(errors.email).toBe(EMAIL_REQUIRED)
    expect(errors.password).toBe(PASSWORD_REQUIRED)
    expect(errors.confirmPassword).toBe(PASSWORD_REQUIRED)
  })
  it('returns errors for invalid values', () => {
    const values = {
      name: 'John123',
      email: 'john@gmail.com!',
      password: '12345',
      confirmPassword: '1234',
    }

    const errors = validate(values, validationSchema)

    expect(errors.name).toBe(USERNAME_INVALID)
    expect(errors.email).toBe(EMAIL_INVALID)
    expect(errors.password).toBe(PASSWORD_INVALID)
    expect(errors.confirmPassword).toBe(PASSWORDS_DIFFERENT)
  })
  it('returns no errors for valid values', () => {
    const values = {
      name: 'John',
      email: 'john@gmail.com',
      password: '123456',
      confirmPassword: '123456',
    }

    const errors = validate(values, validationSchema)
    expect(errors).toEqual({})
  })
})
