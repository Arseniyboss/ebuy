'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from '@hooks/useForm'
import { PaymentMethod } from 'types/user'
import {
  InitialValues,
  paymentMethodSchema,
} from '@validation/schemas/paymentMethodSchema'
import { addPaymentMethod } from '@api/checkout/addPaymentMethod'
import { Form, FormRadio, FormButton, FormError } from '@styles/form'

type Props = {
  paymentMethod?: PaymentMethod
}

// Bug: https://github.com/vercel/next.js/issues/49499)

// 1.checked radio button is unchecked on page reload
// 2.does not occur in production

const PaymentMethodForm = ({ paymentMethod }: Props) => {
  const initialValues: InitialValues = {
    paymentMethod: paymentMethod || '',
  }

  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async () => {
    setLoading(true)
    await addPaymentMethod(values.paymentMethod as PaymentMethod)
    router.push('/placeOrder')
    router.refresh()
  }

  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues,
    onSubmit,
    validationSchema: paymentMethodSchema,
  })
  return (
    <Form onSubmit={handleSubmit} data-testid='payment-method-form'>
      <h1>Payment Method</h1>
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
        <FormError data-testid='form-error'>{errors.paymentMethod}</FormError>
      )}
      <FormButton disabled={loading} data-testid='continue-button'>
        Continue
      </FormButton>
    </Form>
  )
}

export default PaymentMethodForm
