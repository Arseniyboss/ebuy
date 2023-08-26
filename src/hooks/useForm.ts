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

export type ValidationOptions<T> = {
  required: {
    value: boolean
    message: string
  }
  pattern: {
    value: RegExp
    message: string
  }
  minLength: {
    value: number
    message: string
  }
  match: {
    ref: keyof T
    message: string
  }
}

type FieldValidation<T> = Record<keyof T, Partial<ValidationOptions<T>>>

export type ValidationSchema<T> = Partial<FieldValidation<T>>

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

export type Value = string | number

export const useForm = <T extends Record<string, Value>>(options: {
  initialValues: T
  onSubmit: () => void
  validationSchema?: ValidationSchema<T>
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
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
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
