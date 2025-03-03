import { ValidationOptions, ValidationSchema, Errors, Value } from '@/hooks/useForm'

type Entry<T> = [keyof T, ValidationOptions<T, keyof T>]

export const validate = <T extends Record<keyof T, Value>>(
  values: T,
  validationSchema: ValidationSchema<T>
): Errors<T> => {
  const errors: Errors<T> = {}

  const setErrors = (entry: Entry<T>) => {
    const [input, options] = entry
    const { required, pattern, match, isValid } = options

    if (
      !values[input] &&
      required?.value &&
      typeof required.value === 'boolean' &&
      typeof required.message === 'string'
    ) {
      errors[input] = required.message
    }

    if (
      values[input] &&
      pattern?.value instanceof RegExp &&
      !pattern.value.test(values[input].toString()) &&
      typeof pattern.message === 'string'
    ) {
      errors[input] = pattern.message
    }

    if (
      values[input] &&
      isValid?.value instanceof Function &&
      !isValid.value(values[input]) &&
      typeof isValid.message === 'string'
    ) {
      errors[input] = isValid.message
    }

    if (
      values[input] &&
      typeof match?.ref === 'string' &&
      values[match.ref] !== values[input] &&
      typeof match.message === 'string'
    ) {
      errors[input] = match.message
    }
  }

  Object.entries(validationSchema).forEach((entry) => {
    setErrors(entry as Entry<T>)
  })

  return errors
}
