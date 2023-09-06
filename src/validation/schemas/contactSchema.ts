import { ValidationSchema } from '../../hooks/useForm'
import {
  USERNAME_REQUIRED,
  USERNAME_INVALID,
  EMAIL_REQUIRED,
  EMAIL_INVALID,
  MESSAGE_REQUIRED,
} from '@validation/constants/errors'
import { USERNAME_PATTERN, EMAIL_PATTERN } from '@validation/constants/patterns'

export type Values = {
  name: string
  email: string
  message: string
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
  message: {
    required: { value: true, message: MESSAGE_REQUIRED },
  },
}
