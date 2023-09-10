import { Address as Values } from 'types/base/user'
import { ValidationSchema } from '../../hooks/useForm'
import {
  STREET_REQUIRED,
  STREET_INVALID,
  COUNTRY_REQUIRED,
  COUNTRY_INVALID,
  CITY_REQUIRED,
  CITY_INVALID,
  POSTAL_CODE_REQUIRED,
  POSTAL_CODE_INVALID,
} from '@validation/constants/errors'
import {
  STREET_PATTERN,
  COUNTRY_PATTERN,
  CITY_PATTERN,
  POSTAL_CODE_PATTERN,
} from '@validation/constants/patterns'

export const validationSchema: ValidationSchema<Values> = {
  street: {
    required: { value: true, message: STREET_REQUIRED },
    pattern: { value: STREET_PATTERN, message: STREET_INVALID },
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
