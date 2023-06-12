'use client'

import { useState } from 'react'
import { getQuantities } from '@utils/getQuantities'
import { addToCart } from '@utils/addToCart'
import { Product } from 'types/product'
import { FlexGroup } from '@components/product/styles'
import { ProductQuantity, ProductButton, ProductStatus } from './styles'

type Props = {
  product: Product
}

const AddToCart = ({ product }: Props) => {
  const [quantity, setQuantity] = useState(1)
  const quantities = getQuantities(product.countInStock)

  return product.countInStock === 0 ? (
    <ProductStatus>Out Of Stock</ProductStatus>
  ) : (
    <>
      <FlexGroup>
        <p>Quantity:</p>
        <ProductQuantity
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          data-testid='product-quantity'
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
        data-testid='product-button'
      >
        Add To Cart
      </ProductButton>
    </>
  )
}

export default AddToCart