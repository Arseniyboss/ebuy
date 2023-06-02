import { useState } from 'react'
import { useUpdateEffect } from './useUpdateEffect'
import { useTimeout } from './useTimeout'

type ReturnValues<T> = [T, boolean]

export const useDebounce = <T>(value: T, delay = 500): ReturnValues<T> => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  const [isDebouncing, setIsDebouncing] = useState(false)

  useUpdateEffect(() => {
    setIsDebouncing(true)
  }, [value])

  useTimeout(
    () => {
      setDebouncedValue(value)
      setIsDebouncing(false)
    },
    delay,
    [value]
  )

  return [debouncedValue, isDebouncing]
}
