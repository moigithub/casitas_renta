import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

mongoose
  .connect(process.env.MONGO!)
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch(error => {
    console.log('mongodb error', error)
  })

mongoose.connection.on('error', err => {
  console.log('mongodb error', err)
})

const app = express()

app.listen(3000, () => {
  console.log('listening on port 3000')
})
