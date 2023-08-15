'use client'

import { ChangeEvent, useState } from 'react'
import { useQueryParams } from '@hooks/useQueryParams'
import { Status, UserOrdersStatus } from 'types/order'
import { UserOrdersQueryParams } from 'types/params'
import { StatusSelect } from './styles'

type Props = {
  statuses: Status[]
}

const OrderFilter = ({ statuses }: Props) => {
  const { queryParams, setQueryParams } =
    useQueryParams<UserOrdersQueryParams>()
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
