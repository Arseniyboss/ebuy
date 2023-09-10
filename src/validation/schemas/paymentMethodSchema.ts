import { ValidationSchema } from '@hooks/useForm'
import { PaymentMethod } from 'types/base/user'
import { PAYMENT_METHOD_REQUIRED } from '@validation/constants/errors'

export type Values = {
  paymentMethod: PaymentMethod | ''
}

export const validationSchema: ValidationSchema<Values> = {
  paymentMethod: {
    required: { value: true, message: PAYMENT_METHOD_REQUIRED },
  },
}
