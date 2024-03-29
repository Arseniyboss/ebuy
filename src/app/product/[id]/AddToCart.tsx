'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getQuantities } from '@/utils/getters/getQuantities'
import { addCartItem } from '@/api/cart/addCartItem'
import { Product } from '@/types/api'
import { UserPayload } from '@/types/jwtPayload'
import { FlexGroup, ProductQuantity } from '@/styles/globals'
import { ProductButton, ProductStatus } from './styles'

type Props = {
  product: Product
  user?: UserPayload
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

    const { error } = await addCartItem(cartItem)

    if (error) {
      setLoading(false)
      alert(error)
      return
    }

    router.push('/cart')
    router.refresh()
  }

  return countInStock === 0 ? (
    <ProductStatus data-testid='product-status'>Out Of Stock</ProductStatus>
  ) : (
    <>
      <FlexGroup>
        <p>Quantity:</p>
        <ProductQuantity
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          aria-label='select product quantity'
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
