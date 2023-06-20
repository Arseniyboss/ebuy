'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getQuantities } from '@utils/getQuantities'
import { Product } from 'types/product'
import { FlexGroup } from '@components/product/styles'
import { ProductQuantity, ProductButton, ProductStatus } from './styles'

type Props = {
  product: Product
}

const AddToCart = ({ product }: Props) => {
  // const {name, image, price, countInStock} = product

  const [quantity, setQuantity] = useState(1)
  const router = useRouter()
  const quantities = getQuantities(product.countInStock)

  const user = null

  const handleClick = () => {
    if (user) {
      // addToCart({name, image, price, countInStock, quantity})
      router.push('/cart')
    } else {
      router.push('/login')
    }
  }

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
        onClick={handleClick}
        data-testid='product-button'
      >
        Add To Cart
      </ProductButton>
    </>
  )
}

export default AddToCart
