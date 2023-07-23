import { ShippingAddress as InitialValues } from 'types/user'
import { FieldValidation } from '../../hooks/useForm'
import {
  ADDRESS_REQUIRED,
  ADDRESS_INVALID,
  COUNTRY_REQUIRED,
  COUNTRY_INVALID,
  CITY_REQUIRED,
  CITY_INVALID,
  POSTAL_CODE_REQUIRED,
  POSTAL_CODE_INVALID,
} from '@validation/constants/errors'
import {
  ADDRESS_PATTERN,
  COUNTRY_PATTERN,
  CITY_PATTERN,
  POSTAL_CODE_PATTERN,
} from '@validation/constants/patterns'

export const shippingAddressSchema: FieldValidation<InitialValues> = {
  address: {
    required: { value: true, message: ADDRESS_REQUIRED },
    pattern: { value: ADDRESS_PATTERN, message: ADDRESS_INVALID },
  },
  country: {
    required: { value: true, message: COUNTRY_REQUIRED },
    pattern: { value: COUNTRY_PATTERN, message: COUNTRY_INVALID },
  },
  city: {
    required: { value: true, message: CITY_REQUIRED },
    pattern: { value: CITY_PATTERN, message: CITY_INVALID },
  },
  postalCode: {
    required: { value: true, message: POSTAL_CODE_REQUIRED },
    pattern: { value: POSTAL_CODE_PATTERN, message: POSTAL_CODE_INVALID },
  },
}
