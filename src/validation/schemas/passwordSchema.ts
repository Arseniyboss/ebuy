import { UpdateUserPasswordParams as Values } from '@/types/params'
import { ValidationSchema } from '@/hooks/useForm'
import {
  CURRENT_PASSWORD_REQUIRED,
  NEW_PASSWORD_REQUIRED,
  NEW_PASSWORD_INVALID,
  PASSWORDS_DIFFERENT,
} from '@/validation/constants/errors'

export const validationSchema: ValidationSchema<Values> = {
  currentPassword: {
    required: { value: true, message: CURRENT_PASSWORD_REQUIRED },
  },
  newPassword: {
    required: { value: true, message: NEW_PASSWORD_REQUIRED },
    isValid: {
      value: (password) => password.length >= 6,
      message: NEW_PASSWORD_INVALID,
    },
  },
  confirmNewPassword: {
    required: { value: true, message: NEW_PASSWORD_REQUIRED },
    match: { ref: 'newPassword', message: PASSWORDS_DIFFERENT },
  },
}
