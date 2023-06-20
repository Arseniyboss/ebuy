import {
  useState,
  useEffect,
  useCallback,
  FormEvent,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from 'react'
import { validate } from '@validation/validate'

export type ValidationSchema<T> = {
  required?: {
    value: boolean
    message: string
  }
  pattern?: {
    value: RegExp | ((inputValue: string) => boolean)
    message: string
  }
  ref?: {
    value: keyof T
    pattern: (currentInputValue: string, refInputValue: string) => boolean
    message: string
  }
  min?: {
    value: number
    message: string
  }
  max?: {
    value: number
    message: string
  }
  minLength?: {
    value: number
    message: string
  }
  maxLength?: {
    value: number
    message: string
  }
  length?: {
    value: number
    message: string
  }
  match?: {
    ref: keyof T
    message: string
  }
}

export type FieldValidation<T> = Partial<Record<keyof T, ValidationSchema<T>>>
export type Errors<T> = Partial<Record<keyof T, string>>

type SetValues<T> = Dispatch<SetStateAction<T>>
type ChangeEventType = ChangeEvent<
  HTMLInputElement & HTMLTextAreaElement & HTMLSelectElement
>
type FormEventType = FormEvent<HTMLFormElement>

type ReturnValues<T> = {
  values: T
  setValues: SetValues<T>
  errors: Errors<T>
  handleChange: (e: ChangeEventType) => void
  handleSubmit: (e: FormEventType) => void
}

export const EMAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

export const useForm = <T>(options: {
  initialValues: T
  onSubmit: () => void
  validationSchema?: FieldValidation<T>
}): ReturnValues<T> => {
  const { initialValues, onSubmit, validationSchema } = options

  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Errors<T>>({})
  const [isChanging, setIsChanging] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateOnSubmit = () => {
    if (validationSchema && !isSubmitted) {
      setErrors(validate(values, validationSchema))
      setIsChanging(false)
      setIsSubmitted(true)
    }
  }

  const validateOnChange = useCallback(() => {
    if (validationSchema && isSubmitted && isChanging) {
      setErrors(validate(values, validationSchema))
      setIsChanging(false)
    }
  }, [validationSchema, values, isSubmitted, isChanging])

  const handleChange = (e: ChangeEventType) => {
    const { name, value, type, checked } = e.target
    setValues({ ...values, [name]: type === 'checkbox' ? checked : value })
    setIsChanging(true)
    setIsSubmitting(false)
  }

  const handleSubmit = (e: FormEventType) => {
    e.preventDefault()
    setIsSubmitting(true)
    validateOnSubmit()
  }

  useEffect(() => {
    validateOnChange()
  }, [validateOnChange])

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      onSubmit()
      setIsSubmitting(false)
      setIsSubmitted(false)
    }
  }, [errors, isSubmitting, onSubmit])

  return { values, setValues, errors, handleChange, handleSubmit }
}
