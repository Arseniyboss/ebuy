import { EMAIL_REGEX, FieldValidation } from '../../hooks/useForm'
import {
  USERNAME_REQUIRED,
  USERNAME_INVALID,
  EMAIL_REQUIRED,
  EMAIL_INVALID,
  PASSWORD_INVALID,
} from '@validation/constants/errors'
import {
  USERNAME_PATTERN,
  PASSWORD_PATTERN,
} from '@validation/constants/patterns'

type InitialValues = {
  name: string
  email: string
  password: string
}

export const profileSchema: FieldValidation<InitialValues> = {
  name: {
    required: { value: true, message: USERNAME_REQUIRED },
    pattern: { value: USERNAME_PATTERN, message: USERNAME_INVALID },
  },
  email: {
    required: { value: true, message: EMAIL_REQUIRED },
    pattern: { value: EMAIL_REGEX, message: EMAIL_INVALID },
  },
  password: {
    pattern: { value: PASSWORD_PATTERN, message: PASSWORD_INVALID },
  },
}
