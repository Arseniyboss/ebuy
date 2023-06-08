'use client'

import { useState } from 'react'
import { useDebounce } from '@hooks/useDebounce'
import { useQueryParams } from '@hooks/useQueryParams'
import { useUpdateEffect } from '@hooks/useUpdateEffect'
import { SearchInput } from './styles'

const Search = () => {
  const { queryParams, setQueryParams } = useQueryParams()
  const [search, setSearch] = useState(queryParams.search)
  const debouncedSearch = useDebounce(search)

  useUpdateEffect(() => {
    setQueryParams({ search: debouncedSearch, page: 1 })
  }, [debouncedSearch])
  return (
    <SearchInput
      type='text'
      name='search'
      placeholder='Search products...'
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      data-testid='search-input'
    />
  )
}

export default Search
