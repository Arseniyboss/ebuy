import bcrypt from 'bcryptjs'
import { Schema, models, model } from 'mongoose'
import { CartSchema, UserModel } from 'types/models'
import { ShippingAddress, Checkout, User as UserSchema } from 'types/user'
import {
  USERNAME_REQUIRED,
  USERNAME_INVALID,
  EMAIL_REQUIRED,
  EMAIL_INVALID,
  PASSWORD_REQUIRED,
  PASSWORD_INVALID,
} from '@validation/constants/errors'
import { USERNAME_PATTERN, EMAIL_PATTERN } from '@validation/constants/patterns'

const cartSchema = new Schema<CartSchema>({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
})

const shippingAddressSchema = new Schema<ShippingAddress>(
  {
    address: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    postalCode: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
)

const checkoutSchema = new Schema<Checkout>(
  {
    shippingAddress: shippingAddressSchema,
    paymentMethod: {
      type: String,
      required: true,
      enum: {
        values: ['Stripe', 'PayPal'],
        message: 'Payment method is invalid',
      },
      default: 'PayPal',
    },
  },
  { _id: false }
)

const userSchema = new Schema<UserSchema>({
  name: {
    type: String,
    required: [true, USERNAME_REQUIRED],
    validate: [USERNAME_PATTERN, USERNAME_INVALID],
    trim: true,
  },
  email: {
    type: String,
    required: [true, EMAIL_REQUIRED],
    validate: [EMAIL_PATTERN, EMAIL_INVALID],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, PASSWORD_REQUIRED],
    minlength: [6, PASSWORD_INVALID],
  },
  cartItems: [cartSchema],
  checkout: checkoutSchema,
})

userSchema.methods.matchPassword = async function (password: string) {
  return bcrypt.compare(password, this.password)
}

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

const User: UserModel = models.User || model('User', userSchema)

export default User
