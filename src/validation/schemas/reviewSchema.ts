import { ValidationSchema } from '@hooks/useForm'
import { RATING_REQUIRED } from '@validation/constants/errors'

export type Values = {
  rating: string
  comment: string
}

export const validationSchema: ValidationSchema<Values> = {
  rating: {
    required: { value: true, message: RATING_REQUIRED },
  },
}
