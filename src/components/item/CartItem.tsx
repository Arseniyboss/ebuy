'use client'

import Link from 'next/link'
import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaTrashAlt } from 'react-icons/fa'
import { CartItem as Props } from 'types/api'
import { formatPrice } from '@utils/formatters/formatPrice'
import { formatTotalPrice } from '@utils/formatters/formatTotalPrice'
import { getQuantities } from '@utils/getters/getQuantities'
import { deleteCartItem } from '@api/cart/deleteCartItem'
import { updateCartItem } from '@api/cart/updateCartItem'
import { InvisibleButton, ProductQuantity } from '@styles/globals'
import {
  Container,
  ItemImage,
  ItemDetails,
  ItemName,
  FlexGroup,
} from './styles'

const CartItem = ({
  _id,
  name,
  image,
  price,
  countInStock,
  quantity,
}: Props) => {
  const totalPrice = formatPrice(quantity * price)
  const quantities = getQuantities(countInStock)

  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!window.confirm('Are you sure?')) return
    setLoading(true)
    const response = await deleteCartItem(_id)
    if (!response.ok) return alert(response.statusText)
    router.refresh()
  }

  const handleUpdate = async (e: ChangeEvent<HTMLSelectElement>) => {
    const quantity = parseInt(e.target.value)
    const response = await updateCartItem(_id, quantity)
    if (!response.ok) return alert(response.statusText)
    router.refresh()
  }
  return (
    <Container data-testid='cart-item'>
      <Link href={`/product/${_id}`}>
        <ItemImage
          src={image}
          height={153}
          width={192}
          alt={name}
          priority
          data-testid='product-image'
        />
      </Link>
      <ItemDetails>
        <ItemName data-testid='product-name'>{name}</ItemName>
        <h3 data-testid='product-price'>${formatTotalPrice(totalPrice)}</h3>
        <FlexGroup>
          <ProductQuantity
            value={quantity}
            onChange={handleUpdate}
            data-testid='product-quantity'
          >
            {quantities.map((quantity) => (
              <option key={quantity} value={quantity}>
                {quantity}
              </option>
            ))}
          </ProductQuantity>
          <InvisibleButton
            disabled={loading}
            onClick={handleDelete}
            aria-label='delete cart item'
            data-testid='delete-button'
          >
            <FaTrashAlt />
          </InvisibleButton>
        </FlexGroup>
      </ItemDetails>
    </Container>
  )
}

export default CartItem
