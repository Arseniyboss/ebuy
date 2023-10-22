'use client'

import { useRouter } from 'next/navigation'
import { useForm } from '@hooks/useForm'
import { UserPayload } from 'types/jwtPayload'
import { PaymentMethod } from 'types/base/user'
import {
  Values,
  validationSchema,
} from '@validation/schemas/paymentMethodSchema'
import { setPaymentMethod } from '@api/checkout/setPaymentMethod'
import { Form, FormRadio, FormButton, FormError } from '@styles/form'
import CheckoutSteps from '@components/checkoutSteps/CheckoutSteps'

type Props = {
  paymentMethod?: PaymentMethod
  payload: UserPayload
}

const PaymentMethodForm = ({ paymentMethod, payload }: Props) => {
  const initialValues: Values = {
    paymentMethod: paymentMethod || '',
  }

  const router = useRouter()

  const onSubmit = async () => {
    await setPaymentMethod(values.paymentMethod as PaymentMethod)
    router.prefetch('/order/review') // required in production because of Link prefetch in CheckoutSteps
    router.push('/order/review')
    router.refresh()
  }

  const { values, errors, isSubmitted, isValid, handleChange, handleSubmit } =
    useForm({
      initialValues,
      onSubmit,
      validationSchema,
    })
  return (
    <Form onSubmit={handleSubmit} data-testid='payment-method-form'>
      <CheckoutSteps user={payload} />
      <fieldset>
        <legend>
          <h1>Payment Method</h1>
        </legend>
        <div>
          <FormRadio
            type='radio'
            name='paymentMethod'
            id='paypal'
            value='PayPal'
            onChange={handleChange}
            checked={values.paymentMethod === 'PayPal'}
            data-testid='paypal-input'
          />
          <label htmlFor='paypal'>PayPal</label>
        </div>
        <div>
          <FormRadio
            type='radio'
            name='paymentMethod'
            id='stripe'
            value='Stripe'
            onChange={handleChange}
            checked={values.paymentMethod === 'Stripe'}
            data-testid='stripe-input'
          />
          <label htmlFor='stripe'>Stripe</label>
        </div>
        {errors.paymentMethod && (
          <FormError aria-live='polite' data-testid='form-error'>
            {errors.paymentMethod}
          </FormError>
        )}
        <FormButton
          disabled={!isValid || isSubmitted}
          data-testid='continue-button'
        >
          Continue
        </FormButton>
      </fieldset>
    </Form>
  )
}

export default PaymentMethodForm
