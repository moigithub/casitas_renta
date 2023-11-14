import mongoose from 'mongoose'

export interface IUser {
  _id: string
  username?: string
  email?: string
  password?: string
  avatar?: string
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    }
  },
  { timestamps: true }
)

export const User = mongoose.model('User', userSchema)
