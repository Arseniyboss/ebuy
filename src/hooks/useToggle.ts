import { useState } from 'react'

type ReturnValues = [boolean, () => void]

export const useToggle = (initialValue: boolean = false): ReturnValues => {
  const [value, setValue] = useState(initialValue)

  const toggleValue = () => {
    setValue(!value)
  }

  return [value, toggleValue]
}
