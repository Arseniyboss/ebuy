import bcrypt from 'bcryptjs'
import { Schema, models, model } from 'mongoose'
import { CartItem as CartSchema } from 'types/api'
import { User as UserSchema, UserModel } from 'types/user'
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
