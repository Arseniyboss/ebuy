'use client'

import { ChangeEvent, useState } from 'react'
import { useQueryParams } from '@hooks/useQueryParams'
import { Select } from './styles'

const Sort = () => {
  const { queryParams, setQueryParams } = useQueryParams()
  const [sort, setSort] = useState(queryParams.sort)

  const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value
    setSort(sort)
    setQueryParams({ sort, page: 1 })
  }
  return (
    <Select value={sort} onChange={handleSort}>
      <option value=''>Default Order</option>
      <option value='price.asc'>Price: Low - High</option>
      <option value='price.desc'>Price: High - Low</option>
      <option value='rating.desc'>Top Rated</option>
    </Select>
  )
}

export default Sort
