'use client'

import { ChangeEvent, useState } from 'react'
import { useQueryParams } from '@hooks/useQueryParams'
import { HomeQueryParams } from 'types/params'
import { SortSelect } from './styles'

const Sort = () => {
  const { queryParams, setQueryParams } = useQueryParams<HomeQueryParams>()
  const [sort, setSort] = useState(queryParams.sort)

  const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value
    setSort(sort)
    setQueryParams({ sort, page: 1 })
  }
  return (
    <SortSelect
      value={sort}
      onChange={handleSort}
      aria-label='sort select'
      data-testid='sort-select'
    >
      <option value=''>Default Order</option>
      <option value='price.asc'>Price: Low - High</option>
      <option value='price.desc'>Price: High - Low</option>
      <option value='rating.desc'>Top Rated</option>
    </SortSelect>
  )
}

export default Sort
