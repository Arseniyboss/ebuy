import { useState } from 'react'

export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue)

  const toggleValue = () => {
    setValue(!value)
  }

  return [value, toggleValue] as const
}
