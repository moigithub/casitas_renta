import express, { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import authRouter from './routes/auth.route'
import userRouter from './routes/user.route'
import listingRouter from './routes/listing.route'
dotenv.config()

mongoose
  .connect(process.env.MONGO!)
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch((error: any) => {
    console.log('mongodb error', error)
  })

mongoose.connection.on('error', err => {
  console.log('mongodb error', err)
})

mongoose.set('debug', true)

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/listing', listingRouter)

app.get('/', (_req, res) => {
  res.send('sf')
})

// err handler middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})
