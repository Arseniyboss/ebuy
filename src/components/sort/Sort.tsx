'use client'

import { ChangeEvent, useState } from 'react'
import { useQueryParams } from '@hooks/useQueryParams'
import { QueryParams, SortKey, SortOrder } from 'types/queryParams'
import { Select } from './styles'

const Sort = () => {
  const sortOptions = [
    { label: 'Price: Low - High', sortKey: 'price', direction: 'asc' },
    { label: 'Price: High - Low', sortKey: 'price', direction: 'desc' },
    { label: 'Top Rated', sortKey: 'rating', direction: 'desc' },
  ]

  const [sortLabel, setSortLabel] = useState('')
  const setQueryParams = useQueryParams<QueryParams>()

  const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    if (value) {
      const sortOption = sortOptions.find((option) => option.label === value)!
      const { sortKey, direction, label } = sortOption
      setSortLabel(label)
      setQueryParams({
        sort: `${sortKey as SortKey}.${direction as SortOrder}`,
      })
    } else {
      setSortLabel('')
      setQueryParams({ sort: 'createdAt.desc' })
    }
  }
  return (
    <Select name='sort' value={sortLabel} onChange={handleSort}>
      <option value=''>Default Order</option>
      {sortOptions.map((item, index) => (
        <option key={index} value={item.label}>
          {item.label}
        </option>
      ))}
    </Select>
  )
}

export default Sort
