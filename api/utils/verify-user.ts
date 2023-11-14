import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

import { errorHandler } from './error'

export const verifyToken = (req: Request, _res: Response, next: NextFunction) => {
  const token = req.cookies.access_token

  if (!token) return next(errorHandler(401, 'Unauthorized'))

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
    if (err) return next(errorHandler(403, 'Forbidden'))
    req.user = { _id: user.id }
    // console.log('jwt token decoded2', user, req.user)
    next()
  })
}
