import { Schema, models, model } from 'mongoose'
import { Order as OrderSchema } from 'types/order'
import { OrderModel } from 'types/mongo/models'
import { cartSchema, addressSchema } from './user'

const orderSchema = new Schema<OrderSchema>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  orderItems: [cartSchema],
  address: addressSchema,
  paymentMethod: {
    type: String,
    enum: {
      values: ['Stripe', 'PayPal'],
      message: 'Payment method is invalid',
    },
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },
  paidAt: {
    type: String,
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false,
  },
  deliveredAt: {
    type: String,
  },
  deliveryDate: {
    type: String,
  },
})

const Order: OrderModel = models.Order || model('Order', orderSchema)

export default Order
