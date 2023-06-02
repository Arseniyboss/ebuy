import { useEffect } from 'react'

export const useTimeout = <T>(
  callback: () => void,
  delay: number,
  dependencies: T[] = []
): void => {
  useEffect(() => {
    const timeout = setTimeout(() => callback(), delay)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
}
