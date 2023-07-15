'use client'

import { CartItem as Props } from 'types/product'
import { Container, ItemImage, ItemName, ItemPrice } from './styles'
import { ProductQuantity } from '@app/product/[id]/styles'
import { getQuantities } from '@utils/getQuantities'
import { useState } from 'react'

import { FaTrashAlt } from 'react-icons/fa'

const CartItem = ({ name, image, price, countInStock, quantity }: Props) => {
  const quantities = getQuantities(countInStock)
  const [quantity2, setQuantity] = useState(quantity)
  return (
    <Container>
      <ItemImage src={image} alt='' height={102} width={128} />
      <ItemName>{name}</ItemName>
      <ItemPrice>${price}</ItemPrice>
      {/* create a separate component */}
      <ProductQuantity
        value={quantity2}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        data-testid='product-quantity'
      >
        {quantities.map((quantity) => (
          <option key={quantity} value={quantity}>
            {quantity}
          </option>
        ))}
      </ProductQuantity>
      <button>
        <FaTrashAlt />
      </button>
    </Container>
  )
}

export default CartItem
