'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Synchronize authentication status across all tabs after login and logout

const CrossTabAuthSync = () => {
  const router = useRouter()

  useEffect(() => {
    const channel = new BroadcastChannel('auth')
    channel.onmessage = () => {
      router.refresh()
    }
    return () => {
      channel.close()
    }
  }, [])

  return null
}

export default CrossTabAuthSync
