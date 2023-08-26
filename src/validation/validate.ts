import {
  ValidationOptions,
  ValidationSchema,
  Errors,
  Value,
} from '@hooks/useForm'

type Field<T> = [keyof T, ValidationOptions<T>]

export const validate = <T extends Record<keyof T, Value>>(
  values: T,
  validationSchema: ValidationSchema<T>
): Errors<T> => {
  const errors: Errors<T> = {}

  const printErrors = (field: Field<T>) => {
    const property = field[0]
    const value = field[1]

    const options = {
      required: value?.hasOwnProperty('required'),
      pattern: value?.hasOwnProperty('pattern'),
      ref: value?.hasOwnProperty('ref'),
      min: value?.hasOwnProperty('min'),
      max: value?.hasOwnProperty('max'),
      length: value?.hasOwnProperty('length'),
      minLength: value?.hasOwnProperty('minLength'),
      maxLength: value?.hasOwnProperty('maxLength'),
      match: value?.hasOwnProperty('match'),
    }

    const required = value?.required
    const pattern = value?.pattern
    const minLength = value?.minLength
    const match = value?.match

    if (
      options.required &&
      !values[property] &&
      required?.value &&
      typeof required.message === 'string' &&
      typeof required.value === 'boolean'
    ) {
      errors[property] = required.message
    }

    if (
      options.pattern &&
      values[property] &&
      pattern?.value &&
      ((pattern.value instanceof RegExp &&
        !pattern.value.test(values[property].toString())) ||
        (pattern.value instanceof Function &&
          !pattern.value(values[property]))) &&
      typeof pattern.message === 'string'
    ) {
      errors[property] = pattern.message
    }

    if (
      options.minLength &&
      values[property] &&
      minLength?.value &&
      typeof minLength.value === 'number' &&
      values[property].toString().length < minLength.value &&
      typeof minLength.message === 'string'
    ) {
      errors[property] = minLength.message
    }

    if (
      options.match &&
      values[property] &&
      match?.ref &&
      typeof match.ref === 'string' &&
      values[match.ref] !== values[property] &&
      typeof match.message === 'string'
    ) {
      errors[property] = match.message
    }
  }

  Object.entries(validationSchema).forEach((field) =>
    printErrors(field as Field<T>)
  )

  return errors
}
