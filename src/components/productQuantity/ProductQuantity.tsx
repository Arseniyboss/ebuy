'use client'

import { Dispatch, SetStateAction } from 'react'
import { getQuantities } from '@utils/getQuantities'
import { QuantitySelect } from './styles'

type Props = {
  countInStock: number
  quantity: number
  setQuantity: Dispatch<SetStateAction<number>>
}

const ProductQuantity = ({ quantity, setQuantity, countInStock }: Props) => {
  const quantities = getQuantities(countInStock)
  return (
    <QuantitySelect
      value={quantity}
      onChange={(e) => setQuantity(parseInt(e.target.value))}
      data-testid='product-quantity'
    >
      {quantities.map((quantity) => (
        <option key={quantity} value={quantity}>
          {quantity}
        </option>
      ))}
    </QuantitySelect>
  )
}

export default ProductQuantity
