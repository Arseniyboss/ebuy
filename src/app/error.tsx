'use client'

import { useEffect } from 'react'
import { ErrorHeading } from './styles'

type Props = {
  error: Error
}

const Error = ({ error }: Props) => {
  useEffect(() => {
    console.error(error)
  }, [error])
  return <ErrorHeading>Something went wrong</ErrorHeading>
}

export default Error
