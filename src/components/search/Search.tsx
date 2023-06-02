'use client'

import { useState } from 'react'
import { useDebounce } from '@hooks/useDebounce'
import { useQueryParams } from '@hooks/useQueryParams'
import { useUpdateEffect } from '@hooks/useUpdateEffect'
import { QueryParams } from 'types/queryParams'
import { SearchInput } from './styles'

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm] = useDebounce(searchTerm)
  const setQueryParams = useQueryParams<QueryParams>()

  useUpdateEffect(() => {
    setQueryParams({ searchTerm: debouncedSearchTerm })
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
