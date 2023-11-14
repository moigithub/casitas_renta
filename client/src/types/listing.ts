export interface IListing {
  _id: string
  imageUrls: string[]
  name: string
  description: string
  address: string
  type: 'rent' | 'sale'
  bedrooms: number
  bathrooms: number
  regularPrice: number
  discountPrice: number
  offer: boolean
  parking: boolean
  furnished: boolean
  userRef?: string
}

export interface IUser {
  username: string
  email: string
}
