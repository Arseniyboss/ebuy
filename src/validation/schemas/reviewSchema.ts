import { CreateReviewParams as InitialValues } from 'types/params'
import { FieldValidation } from '@hooks/useForm'
import { RATING_REQUIRED } from '@validation/constants/errors'

export const reviewSchema: FieldValidation<InitialValues> = {
  rating: {
    required: { value: true, message: RATING_REQUIRED },
  },
}
