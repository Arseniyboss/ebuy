type DeleteCartItem = {
  type: 'DELETE_ITEM'
  id: string
}

type UpdateCartItem = {
  type: 'UPDATE_ITEM'
  id: string
  quantity: number
}

export type CartAction = DeleteCartItem | UpdateCartItem
