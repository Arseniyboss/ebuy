import { CreateReviewParams as Values } from '@/types/params'
import { ValidationSchema } from '@/hooks/useForm'
import { RATING_REQUIRED } from '@/validation/constants/errors'

export const validationSchema: ValidationSchema<Values> = {
  rating: {
    required: { value: true, message: RATING_REQUIRED },
  },
}
