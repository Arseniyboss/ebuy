import { FieldValidation } from '@hooks/useForm'
import { EMAIL_REQUIRED, PASSWORD_REQUIRED } from '@validation/constants/errors'

type InitialValues = {
  email: string
  password: string
}

export const loginSchema: FieldValidation<InitialValues> = {
  email: {
    required: { value: true, message: EMAIL_REQUIRED },
  },
  password: {
    required: { value: true, message: PASSWORD_REQUIRED },
  },
}
