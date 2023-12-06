'use client'

import { useEffect } from 'react'

type Props = {
  error: Error
}

const Error = ({ error }: Props) => {
  useEffect(() => {
    console.error(error)
  }, [error])
  return <h1>Something went wrong</h1>
}

export default Error
