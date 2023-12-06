'use client'

import { useEffect } from 'react'

type Props = {
  error: Error
}

const GlobalError = ({ error }: Props) => {
  useEffect(() => {
    console.error(error)
  }, [error])
  return (
    <html>
      <body>
        <h1>Something went wrong</h1>
      </body>
    </html>
  )
}

export default GlobalError
