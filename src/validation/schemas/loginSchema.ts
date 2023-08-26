import { UserLoginParams as InitialValues } from 'types/params'
import { ValidationSchema } from '@hooks/useForm'
import { EMAIL_REQUIRED, PASSWORD_REQUIRED } from '@validation/constants/errors'

export const validationSchema: ValidationSchema<InitialValues> = {
  email: {
    required: { value: true, message: EMAIL_REQUIRED },
  },
  password: {
    required: { value: true, message: PASSWORD_REQUIRED },
  },
}
