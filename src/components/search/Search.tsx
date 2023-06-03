'use client'

import { useState } from 'react'
import { useDebounce } from '@hooks/useDebounce'
import { useQueryParams } from '@hooks/useQueryParams'
import { useUpdateEffect } from '@hooks/useUpdateEffect'
import { SearchInput } from './styles'

const Search = () => {
  const { queryParams, setQueryParams } = useQueryParams()
  const [searchTerm, setSearchTerm] = useState(queryParams.searchTerm)
  const debouncedSearchTerm = useDebounce(searchTerm)

  useUpdateEffect(() => {
    setQueryParams({ searchTerm: debouncedSearchTerm, page: 1 })
  }, [debouncedSearchTerm])
  return (
    <SearchInput
      type='text'
      name='searchTerm'
      placeholder='Search products...'
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  )
}

export default Search
