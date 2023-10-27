import {
  useState,
  useEffect,
  useCallback,
  FormEvent,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from 'react'
import { validate } from '@/validation/validate'
import { useFormState } from './useFormState'

export type ValidationOptions<T, P extends keyof T> = {
  required: {
    value: boolean
    message: string
  }
  pattern: {
    value: RegExp
    message: string
  }
  isValid: {
    value: (inputValue: T[P]) => boolean
    message: string
  }
  match: {
    ref: Exclude<keyof T, P>
    message: string
  }
}

export type FieldValidation<T> = {
  [P in keyof T]: Partial<ValidationOptions<T, P>>
}

export type ValidationSchema<T> = Partial<FieldValidation<T>>

export type Value = string | number | boolean

type SetValues<T> = Dispatch<SetStateAction<T>>

export type Errors<T> = Partial<Record<keyof T, string>>

export type OnSubmit = () => void | Promise<string | void>

type HTMLChangeElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement

type ReturnValues<T> = {
  values: T
  errors: Errors<T>
  error: string
  loading: boolean
  success: boolean
  isSubmitted: boolean
  isValid: boolean
  setValues: SetValues<T>
  handleChange: (e: ChangeEvent<HTMLChangeElement>) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
}

type Props<T> = {
  initialValues: T
  onSubmit: OnSubmit
  validationSchema?: ValidationSchema<T>
}

export const useForm = <T extends Record<string, Value>>({
  initialValues,
  onSubmit,
  validationSchema,
}: Props<T>): ReturnValues<T> => {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Errors<T>>({})
  const [isChanging, setIsChanging] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [validatedOnSubmit, setValidatedOnSubmit] = useState<boolean>(false)

  const { error, loading, success, isSubmitted, onSuccess } = useFormState({
    onSubmit,
    errors,
  })

  const isValid = Object.keys(errors).length === 0

  const validateOnSubmit = () => {
    if (validationSchema && isValid) {
      setErrors(validate(values, validationSchema))
      setValidatedOnSubmit(true)
    }
  }

  const validateOnChange = useCallback(() => {
    if (validationSchema && validatedOnSubmit && isChanging) {
      setErrors(validate(values, validationSchema))
      setIsChanging(false)
    }
  }, [validationSchema, values, validatedOnSubmit, isChanging])

  const setValue = (e: ChangeEvent<HTMLChangeElement>) => {
    const { name, type, value } = e.target
    switch (type) {
      case 'number':
        const { valueAsNumber } = e.target as HTMLInputElement
        setValues({ ...values, [name]: valueAsNumber || value })
        break
      case 'checkbox':
        const { checked } = e.target as HTMLInputElement
        setValues({ ...values, [name]: checked })
        break
      case 'select-one':
        setValues({ ...values, [name]: Number(value) || value })
        break
      default:
        setValues({ ...values, [name]: value })
        break
    }
  }

  const handleChange = (e: ChangeEvent<HTMLChangeElement>) => {
    setValue(e)
    setIsChanging(true)
    setIsSubmitting(false)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    validateOnSubmit()
    setIsSubmitting(true)
    setIsChanging(false)
  }

  useEffect(() => {
    validateOnChange()
  }, [validateOnChange])

  useEffect(() => {
    if (isValid && isSubmitting) {
      onSuccess()
      setIsSubmitting(false)
      setValidatedOnSubmit(false)
    }
  }, [errors, isValid, isSubmitting, onSuccess])

  return {
    values,
    errors,
    error,
    loading,
    success,
    isSubmitted,
    isValid,
    setValues,
    handleChange,
    handleSubmit,
  }
}
