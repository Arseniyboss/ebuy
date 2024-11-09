import { ValidationSchema } from '@/hooks/useForm'
import {
  USERNAME_REQUIRED,
  USERNAME_INVALID,
  EMAIL_REQUIRED,
  EMAIL_INVALID,
  PASSWORD_REQUIRED,
  PASSWORD_INVALID,
  PASSWORDS_DIFFERENT,
} from '@/validation/constants/errors'
import { USERNAME_PATTERN, EMAIL_PATTERN } from '@/validation/constants/patterns'

export type Values = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export const validationSchema: ValidationSchema<Values> = {
  name: {
    required: { value: true, message: USERNAME_REQUIRED },
    pattern: { value: USERNAME_PATTERN, message: USERNAME_INVALID },
  },
  email: {
    required: { value: true, message: EMAIL_REQUIRED },
    pattern: { value: EMAIL_PATTERN, message: EMAIL_INVALID },
  },
  password: {
    required: { value: true, message: PASSWORD_REQUIRED },
    isValid: {
      value: (password) => password.length >= 6,
      message: PASSWORD_INVALID,
    },
  },
  confirmPassword: {
    required: { value: true, message: PASSWORD_REQUIRED },
    match: { ref: 'password', message: PASSWORDS_DIFFERENT },
  },
}
