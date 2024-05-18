'use client'

import Link from 'next/link'
import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaTrashAlt } from 'react-icons/fa'
import { CartItem as Props } from '@/types/api'
import { formatPrice } from '@/utils/formatters/formatPrice'
import { formatTotalPrice } from '@/utils/formatters/formatTotalPrice'
import { getQuantities } from '@/utils/getters/getQuantities'
import { deleteCartItem } from '@/api/cart/deleteCartItem'
import { updateCartItem } from '@/api/cart/updateCartItem'
import { InvisibleButton, ProductQuantity } from '@/styles/globals'
import {
  Container,
  ItemImage,
  ItemDetails,
  ItemName,
  ItemPrice,
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
    const { error } = await deleteCartItem(_id)
    if (error) return alert(error)
    router.refresh()
  }

  const handleUpdate = async (e: ChangeEvent<HTMLSelectElement>) => {
    const quantity = parseInt(e.target.value)
    await updateCartItem(_id, quantity)
    const { error } = await updateCartItem(_id, quantity)
    if (error) return alert(error)
    router.refresh()
  }
  return (
    <Container data-testid='cart-item'>
      <Link href={`/product/${_id}`} aria-label={name}>
        <ItemImage
          src={image}
          height={153}
          width={192}
          alt=''
          priority
          data-testid='product-image'
        />
      </Link>
      <ItemDetails aria-label='cart item details'>
        <ItemName data-testid='product-name'>{name}</ItemName>
        <ItemPrice data-testid='product-price'>
          ${formatTotalPrice(totalPrice)}
        </ItemPrice>
        <FlexGroup>
          <ProductQuantity
            value={quantity}
            onChange={handleUpdate}
            aria-label='select item quantity'
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
