import { FieldValidation } from '@hooks/useForm'
import { RATING_REQUIRED } from '@validation/constants/errors'

type InitialValues = {
  rating: number
  comment: string
}

export const reviewSchema: FieldValidation<InitialValues> = {
  rating: {
    required: { value: true, message: RATING_REQUIRED },
  },
}
