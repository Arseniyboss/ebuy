import { useState, useEffect } from 'react'
import { useTimeout } from './useTimeout'
import { Errors, OnSubmit } from './useForm'

type Props<T> = {
  onSubmit: OnSubmit
  errors: Errors<T>
}

export const useFormState = <T>({ onSubmit, errors }: Props<T>) => {
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const onBeforeSubmit = () => {
    setLoading(true)
    setSuccess(false)
    setIsSubmitted(true)
    setError('')
  }

  const onError = (error: string) => {
    setLoading(false)
    setSuccess(false)
    setIsSubmitted(false)
    setError(error)
  }

  const onAfterSubmit = () => {
    setLoading(false)
    setSuccess(true)
  }

  const onSuccess = async () => {
    onBeforeSubmit()
    const error = await onSubmit()
    if (error) return onError(error)
    onAfterSubmit()
  }

  useEffect(() => {
    setError('')
    setSuccess(false)
  }, [errors])

  const onTimeout = () => {
    if (success) {
      setSuccess(false)
    }
    if (error) {
      setError('')
    }
  }

  useTimeout(() => onTimeout(), 3000, [success, error])

  return { error, loading, success, isSubmitted, onSuccess }
}
