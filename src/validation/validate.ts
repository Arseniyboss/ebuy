import { ValidationSchema, FieldValidation, Errors } from '@hooks/useForm'

type Field<T> = [keyof T, ValidationSchema<T>]

export const validate = <T extends Record<keyof T, any>>(
  values: T,
  validationSchema: FieldValidation<T>
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
    const ref = value?.ref
    const min = value?.min
    const max = value?.max
    const length = value?.length
    const minLength = value?.minLength
    const maxLength = value?.maxLength
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
        !pattern.value.test(values[property])) ||
        (pattern.value instanceof Function &&
          !pattern.value(values[property]))) &&
      typeof pattern.message === 'string'
    ) {
      errors[property] = pattern.message
    }

    if (
      options.ref &&
      values[property] &&
      ref?.value &&
      typeof ref.value === 'string' &&
      ref.pattern instanceof Function &&
      !ref.pattern(values[property], values[ref.value]) &&
      typeof ref.message === 'string'
    ) {
      errors[property] = ref.message
    }

    if (
      options.min &&
      values[property] &&
      min?.value &&
      typeof min.value === 'number' &&
      parseInt(values[property]) < min.value &&
      typeof min.message === 'string'
    ) {
      errors[property] = min.message
    }

    if (
      options.max &&
      values[property] &&
      max?.value &&
      typeof max.value === 'number' &&
      parseInt(values[property]) > max.value &&
      typeof max.message === 'string'
    ) {
      errors[property] = max.message
    }

    if (
      options.length &&
      values[property] &&
      length?.value &&
      typeof length.value === 'number' &&
      values[property].length !== length.value &&
      typeof length.message === 'string'
    ) {
      errors[property] = length.message
    }

    if (
      options.minLength &&
      values[property] &&
      minLength?.value &&
      typeof minLength.value === 'number' &&
      values[property].length < minLength.value &&
      typeof minLength.message === 'string'
    ) {
      errors[property] = minLength.message
    }

    if (
      options.maxLength &&
      values[property] &&
      maxLength?.value &&
      typeof maxLength.value === 'number' &&
      values[property].length > maxLength.value &&
      typeof maxLength.message === 'string'
    ) {
      errors[property] = maxLength.message
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
