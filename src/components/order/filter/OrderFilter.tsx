'use client'

import { ChangeEvent, useState } from 'react'
import { useQueryParams } from '@hooks/useQueryParams'
import { Status, UserOrdersStatus } from 'types/base/order'
import { UserOrdersQueryParams as QueryParams } from 'types/params'
import { StatusSelect } from './styles'

type Props = {
  statuses: {
    name: Status
    label: string
  }[]
}

const OrderFilter = ({ statuses }: Props) => {
  const { queryParams, setQueryParams } = useQueryParams<QueryParams>()
  const [status, setStatus] = useState(queryParams.status)

  const handleStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as UserOrdersStatus
    setStatus(status)
    setQueryParams({ status, page: 1 })
  }
  return (
    <StatusSelect
      value={status}
      onChange={handleStatus}
      aria-label='select order status'
      data-testid='status-select'
    >
      <option value=''>Status</option>
      {statuses.map((status, index) => (
        <option key={index} value={status.name}>
          {status.label}
        </option>
      ))}
    </StatusSelect>
  )
}

export default OrderFilter
