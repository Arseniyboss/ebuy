'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getQuantities } from '@utils/getQuantities'
import { addCartItem } from '@api/cart/addCartItem'
import { Product } from 'types/api'
import { JwtPayload } from 'types/jwtPayload'
import { FlexGroup, ProductQuantity } from '@styles/globals'
import { ProductButton, ProductStatus } from './styles'

type Props = {
  product: Product
  user?: JwtPayload
}

const AddToCart = ({ product, user }: Props) => {
  const { _id, name, image, price, countInStock } = product

  const quantities = getQuantities(countInStock)

  const [loading, setLoading] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const router = useRouter()

  const cartItem = { _id, name, image, price, countInStock, quantity }

  const handleClick = async () => {
    if (!user) {
      return router.push('/login')
    }

    setLoading(true)

    const response = await addCartItem(cartItem)

    if (!response.ok) {
      setLoading(false)
      alert(response.statusText)
      return
    }

    router.push('/cart')
    router.refresh()
  }

  return countInStock === 0 ? (
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
        disabled={loading || countInStock === 0}
        onClick={handleClick}
        data-testid='product-button'
      >
        Add To Cart
      </ProductButton>
    </>
  )
}

export default AddToCart
