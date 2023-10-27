import bcrypt from 'bcryptjs'
import { Schema, models, model } from 'mongoose'
import { CartSchema, UserModel } from '@/types/mongo/models'
import { Address as AddressSchema, User as UserSchema } from '@/types/base/user'
import {
  STREET_REQUIRED,
  STREET_INVALID,
  COUNTRY_REQUIRED,
  COUNTRY_INVALID,
  CITY_REQUIRED,
  CITY_INVALID,
  POSTAL_CODE_REQUIRED,
  POSTAL_CODE_INVALID,
  USERNAME_REQUIRED,
  USERNAME_INVALID,
  EMAIL_REQUIRED,
  EMAIL_INVALID,
  PASSWORD_REQUIRED,
  PASSWORD_INVALID,
} from '@/validation/constants/errors'
import {
  STREET_PATTERN,
  COUNTRY_PATTERN,
  CITY_PATTERN,
  POSTAL_CODE_PATTERN,
  USERNAME_PATTERN,
  EMAIL_PATTERN,
} from '@/validation/constants/patterns'

export const cartSchema = new Schema<CartSchema>({
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

export const addressSchema = new Schema<AddressSchema>(
  {
    street: {
      type: String,
      required: [true, STREET_REQUIRED],
      validate: [STREET_PATTERN, STREET_INVALID],
      trim: true,
    },
    country: {
      type: String,
      required: [true, COUNTRY_REQUIRED],
      validate: [COUNTRY_PATTERN, COUNTRY_INVALID],
      trim: true,
    },
    city: {
      type: String,
      required: [true, CITY_REQUIRED],
      validate: [CITY_PATTERN, CITY_INVALID],
      trim: true,
    },
    postalCode: {
      type: String,
      required: [true, POSTAL_CODE_REQUIRED],
      validate: [POSTAL_CODE_PATTERN, POSTAL_CODE_INVALID],
      trim: true,
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
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  cartItems: [cartSchema],
  address: addressSchema,
  paymentMethod: {
    type: String,
    enum: {
      values: ['Stripe', 'PayPal'],
      message: 'Payment method is invalid',
    },
  },
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
