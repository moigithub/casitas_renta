import mongoose, { Schema, Types } from 'mongoose'

export interface IListing {
  _id: string
  name: string
  description: string
  address: string
  regularPrice: number
  discountPrice: number
  bathrooms: number
  bedrooms: number
  furnished: boolean
  parking: boolean
  type: string
  offer: boolean
  imageUrls: string[]
  userRef: string
  user: Types.ObjectId
}

const listingSchema = new mongoose.Schema<IListing>(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    regularPrice: {
      type: Number,
      required: true
    },
    discountPrice: {
      type: Number,
      required: true
    },
    bathrooms: {
      type: Number,
      required: true
    },
    bedrooms: {
      type: Number,
      required: true
    },
    furnished: {
      type: Boolean,
      required: true
    },
    parking: {
      type: Boolean,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    offer: {
      type: Boolean,
      required: true
    },
    imageUrls: {
      type: [String],
      required: true
    },
    userRef: {
      type: String,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
)

export const Listing = mongoose.model('Listing', listingSchema)
