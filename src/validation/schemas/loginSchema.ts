import { UserLoginParams as InitialValues } from 'types/params'
import { FieldValidation } from '@hooks/useForm'
import { EMAIL_REQUIRED, PASSWORD_REQUIRED } from '@validation/constants/errors'

export const loginSchema: FieldValidation<InitialValues> = {
  email: {
    required: { value: true, message: EMAIL_REQUIRED },
  },
  password: {
    required: { value: true, message: PASSWORD_REQUIRED },
  },
}
