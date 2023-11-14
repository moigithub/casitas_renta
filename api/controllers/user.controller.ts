import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error'
import { User } from '../models/user.model'
import { NextFunction, Request, Response } from 'express'
import { Listing } from '../models/listing.model'

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  // console.log('updateuser', req.user, req.params)
  if (req.user._id !== req.params.id) return next(errorHandler(401, 'Unauthorized'))
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar
        }
      },
      {
        new: true,
        projection: {
          password: false
        }
      }
    ).lean()
    console.log('upd user', updatedUser)
    // const { password: pass, ...rest } = updatedUser

    res.status(200).json(updatedUser)
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user._id !== req.params.id) return next(errorHandler(401, 'Unauthorized'))
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id) //.lean()
    console.log('delete user', deletedUser)

    res.status(200).clearCookie('access_token').json('user deleted')
  } catch (error) {
    next(error)
  }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  //if (req.user._id !== req.params.id) return next(errorHandler(401, 'Unauthorized'))
  try {
    const user = await User.findById(req.params.id, { password: -1 }) //.lean()
    console.log('get user', user)

    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

export const getUserListings = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user._id !== req.params.id) return next(errorHandler(401, 'Unauthorized'))
  try {
    const listings = await Listing.find({
      userRef: req.params.id
    })
    return res.status(200).json(listings)
  } catch (error) {
    next(error)
  }
}
