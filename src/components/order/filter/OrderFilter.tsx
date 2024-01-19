'use client'

import { ChangeEvent, useState } from 'react'
import { useQueryParams } from '@/hooks/useQueryParams'
import { UserOrdersQueryParams, OrdersQueryParams } from '@/types/params'
import { Status as StatusName } from '@/types/order'
import { StatusSelect } from './styles'

type QueryParams = UserOrdersQueryParams | OrdersQueryParams

type Status = {
  name: StatusName
  label: string
}

type Props = {
  statuses: Status[]
}

const OrderFilter = ({ statuses }: Props) => {
  const { queryParams, setQueryParams } = useQueryParams<QueryParams>()
  const [status, setStatus] = useState(queryParams.status)

  const handleStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as StatusName
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
