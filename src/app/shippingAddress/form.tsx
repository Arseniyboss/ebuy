'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from '@hooks/useForm'
import { ShippingAddress } from 'types/user'
import { shippingAddressSchema } from '@validation/schemas/shippingAddressSchema'
import { addShippingAddress } from '@api/checkout/addShippingAddress'
import { Input } from '@styles/globals'
import { Form, FormGroup, FormButton, FormError } from '@styles/form'

type Props = {
  shippingAddress?: ShippingAddress
}

const ShippingAddressForm = ({ shippingAddress }: Props) => {
  const initialValues = {
    address: shippingAddress?.address || '',
    country: shippingAddress?.country || '',
    city: shippingAddress?.city || '',
    postalCode: shippingAddress?.postalCode || '',
  }

  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async () => {
    setLoading(true)
    await addShippingAddress(values)
    router.push('/paymentMethod')
    router.refresh()
  }

  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues,
    onSubmit,
    validationSchema: shippingAddressSchema,
  })
  return (
    <Form onSubmit={handleSubmit} data-testid='shipping-address-form'>
      <h1>Shipping Address</h1>
      <FormGroup>
        <label htmlFor='address'>Address</label>
        <Input
          type='text'
          name='address'
          id='address'
          value={values.address}
          onChange={handleChange}
          autoComplete='on'
          data-testid='address-input'
        />
        {errors.address && (
          <FormError data-testid='address-error'>{errors.address}</FormError>
        )}
      </FormGroup>
      <FormGroup>
        <label htmlFor='country'>Country</label>
        <Input
          type='text'
          name='country'
          id='country'
          value={values.country}
          onChange={handleChange}
          autoComplete='on'
          data-testid='country-input'
        />
        {errors.country && (
          <FormError data-testid='country-error'>{errors.country}</FormError>
        )}
      </FormGroup>
      <FormGroup>
        <label htmlFor='city'>City</label>
        <Input
          type='text'
          name='city'
          id='city'
          value={values.city}
          onChange={handleChange}
          autoComplete='on'
          data-testid='city-input'
        />
        {errors.city && (
          <FormError data-testid='city-error'>{errors.city}</FormError>
        )}
      </FormGroup>
      <FormGroup>
        <label htmlFor='postalCode'>Postal Code</label>
        <Input
          type='text'
          name='postalCode'
          id='postalCode'
          value={values.postalCode}
          onChange={handleChange}
          autoComplete='on'
          data-testid='postal-code-input'
        />
        {errors.postalCode && (
          <FormError data-testid='postal-code-error'>
            {errors.postalCode}
          </FormError>
        )}
      </FormGroup>
      <FormButton disabled={loading} data-testid='continue-button'>
        Continue
      </FormButton>
    </Form>
  )
}

export default ShippingAddressForm
