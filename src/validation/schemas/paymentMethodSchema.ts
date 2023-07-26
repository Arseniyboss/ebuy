import { FieldValidation } from '@hooks/useForm'
import { PaymentMethod } from 'types/user'
import { PAYMENT_METHOD_REQUIRED } from '@validation/constants/errors'

export type InitialValues = {
  paymentMethod: PaymentMethod | ''
}

export const paymentMethodSchema: FieldValidation<InitialValues> = {
  paymentMethod: {
    required: { value: true, message: PAYMENT_METHOD_REQUIRED },
  },
}
