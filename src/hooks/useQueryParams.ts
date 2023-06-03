'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { QueryParams } from 'types/queryParams'

export const useQueryParams = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const queryParams = Object.fromEntries(searchParams) as Partial<QueryParams>

  const urlSearchParams = new URLSearchParams(searchParams.toString())

  const setQueryParams = (params: Partial<QueryParams>) => {
    Object.entries(params).forEach(([key, value]) => {
      urlSearchParams.set(key, String(value))
    })
    const searchParams = urlSearchParams.toString()
    const query = searchParams ? `?${searchParams}` : ''
    router.push(`${pathname}${query}`)
  }

  return { queryParams, setQueryParams }
}
