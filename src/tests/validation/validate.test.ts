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

const emptyValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const invalidValues = {
  name: 'John123',
  email: 'john@gmail.com!',
  password: '12345',
  confirmPassword: '1234',
}

const validValues = {
  name: 'John',
  email: 'john@gmail.com',
  password: '123456',
  confirmPassword: '123456',
}

describe('validates form values', () => {
  it('returns error messages for empty values', () => {
    const errors = validate(emptyValues, validationSchema)

    expect(errors.name).toBe(USERNAME_REQUIRED)
    expect(errors.email).toBe(EMAIL_REQUIRED)
    expect(errors.password).toBe(PASSWORD_REQUIRED)
    expect(errors.confirmPassword).toBe(PASSWORD_REQUIRED)
  })
  it('returns error messages for invalid values', () => {
    const errors = validate(invalidValues, validationSchema)

    expect(errors.name).toBe(USERNAME_INVALID)
    expect(errors.email).toBe(EMAIL_INVALID)
    expect(errors.password).toBe(PASSWORD_INVALID)
    expect(errors.confirmPassword).toBe(PASSWORDS_DIFFERENT)
  })
  it('returns no error messages for valid values', () => {
    const errors = validate(invalidValues, validationSchema)
    expect(errors).toEqual({})
  })
})
