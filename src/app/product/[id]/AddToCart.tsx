'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addCartItem } from '@api/cart/addCartItem'
import { Product } from 'types/api'
import { JwtPayload } from 'types/jwtPayload'
import { FlexGroup } from '@components/product/styles'
import { ProductButton, ProductStatus } from './styles'
import ProductQuantity from '@components/productQuantity/ProductQuantity'

type Props = {
  product: Product
  user?: JwtPayload
}

const AddToCart = ({ product, user }: Props) => {
  const { _id, name, image, price, countInStock } = product

  const [loading, setLoading] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const router = useRouter()

  const cartItem = { _id, name, image, price, countInStock, quantity }

  const handleClick = async () => {
    if (user) {
      setLoading(true)

      const response = await addCartItem(cartItem)

      if (!response.ok) {
        setLoading(false)
        alert(response.statusText)
        return
      }

      router.push('/cart')
      router.refresh()
    } else {
      router.push('/login')
    }
  }

  return countInStock === 0 ? (
    <ProductStatus>Out Of Stock</ProductStatus>
  ) : (
    <>
      <FlexGroup>
        <p>Quantity:</p>
        <ProductQuantity
          countInStock={countInStock}
          quantity={quantity}
          setQuantity={setQuantity}
        />
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
