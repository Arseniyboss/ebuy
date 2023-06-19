import bcrypt from 'bcryptjs'
import { Schema, models, model, Model } from 'mongoose'
import { UserSchema } from 'types/user'

type UserModel = Model<UserSchema>

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
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

const User = (models.User as UserModel) || model<UserSchema>('User', userSchema)

export default User
