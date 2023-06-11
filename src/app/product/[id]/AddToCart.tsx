'use client'

import { useState } from 'react'
import { getQuantities } from '@utils/getQuantities'
import { addToCart } from '@utils/addToCart'
import { Product } from 'types/product'
import { FlexGroup } from '@components/product/styles'
import { ProductQuantity, ProductButton } from './styles'

type Props = {
  product: Product
}

const AddToCart = ({ product }: Props) => {
  const [quantity, setQuantity] = useState(1)
  const quantities = getQuantities(product.countInStock)
  return (
    <>
      <FlexGroup>
        <p>Quantity:</p>
        <ProductQuantity
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        >
          {quantities.map((quantity) => (
            <option key={quantity} value={quantity}>
              {quantity}
            </option>
          ))}
        </ProductQuantity>
      </FlexGroup>
      <ProductButton
        disabled={product.countInStock === 0}
        onClick={() => addToCart({ ...product, quantity })}
      >
        Add To Cart
      </ProductButton>
    </>
  )
}

export default AddToCart
