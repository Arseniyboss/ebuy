'use client'

import { useRouter } from 'next/navigation'
import { useForm } from '@hooks/useForm'
import { UserPayload } from 'types/jwtPayload'
import { Address } from 'types/base/user'
import { validationSchema } from '@validation/schemas/addressSchema'
import { setAddress } from '@api/checkout/setAddress'
import { Input } from '@styles/globals'
import { Form, FormGroup, FormButton, FormError } from '@styles/form'
import CheckoutSteps from '@components/checkoutSteps/CheckoutSteps'

type Props = {
  address?: Address
  payload: UserPayload
}

const AddressForm = ({ address, payload }: Props) => {
  const initialValues: Address = {
    street: address?.street || '',
    country: address?.country || '',
    city: address?.city || '',
    postalCode: address?.postalCode || '',
  }

  const router = useRouter()

  const onSubmit = async () => {
    await setAddress(values)
    router.prefetch('/payment') // required in production because of Link prefetch in CheckoutSteps
    router.push('/payment')
    router.refresh()
  }

  const { values, errors, isSubmitted, isValid, handleChange, handleSubmit } =
    useForm({
      initialValues,
      onSubmit,
      validationSchema,
    })
  return (
    <Form onSubmit={handleSubmit} data-testid='address-form'>
      <CheckoutSteps user={payload} />
      <h1>Address</h1>
      <FormGroup>
        <label htmlFor='street'>Street</label>
        <Input
          type='text'
          name='street'
          id='street'
          value={values.street}
          onChange={handleChange}
          autoComplete='on'
          aria-required
          aria-invalid={!!errors.street}
          aria-describedby={errors.street && 'street-error'}
          data-testid='street-input'
        />
        {errors.street && (
          <FormError
            id='street-error'
            aria-live='polite'
            data-testid='street-error'
          >
            {errors.street}
          </FormError>
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
          aria-required
          aria-invalid={!!errors.country}
          aria-describedby={errors.country && 'country-error'}
          data-testid='country-input'
        />
        {errors.country && (
          <FormError
            id='country-error'
            aria-live='polite'
            data-testid='country-error'
          >
            {errors.country}
          </FormError>
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
          aria-required
          aria-invalid={!!errors.city}
          aria-describedby={errors.city && 'city-error'}
          data-testid='city-input'
        />
        {errors.city && (
          <FormError
            id='city-error'
            aria-live='polite'
            data-testid='city-error'
          >
            {errors.city}
          </FormError>
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
          aria-required
          aria-invalid={!!errors.postalCode}
          aria-describedby={errors.postalCode && 'postal-code-error'}
          data-testid='postal-code-input'
        />
        {errors.postalCode && (
          <FormError
            id='postal-code-error'
            aria-live='polite'
            data-testid='postal-code-error'
          >
            {errors.postalCode}
          </FormError>
        )}
      </FormGroup>
      <FormButton
        disabled={!isValid || isSubmitted}
        data-testid='continue-button'
      >
        Continue
      </FormButton>
    </Form>
  )
}

export default AddressForm
