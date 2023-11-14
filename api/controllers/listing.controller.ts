import { Listing } from '../models/listing.model'
import { NextFunction, Request, Response } from 'express'
import { errorHandler } from '../utils/error'
import { SortOrder } from 'mongoose'

export const createListing = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const listing = await Listing.create({ ...req.body, user: req.user._id })
    return res.status(201).json(listing)
  } catch (error) {
    next(error)
  }
}

export const deleteListing = async (req: Request, res: Response, next: NextFunction) => {
  // console.log('deleteListing', req.params)
  try {
    const listing = await Listing.findById(req.params.id)
    if (!listing) return next(errorHandler(404, 'Not found'))
    if (req.user._id !== listing.userRef) return next(errorHandler(401, 'Unauthorized'))

    await Listing.findByIdAndDelete(req.params.id)

    return res.status(200).json({ success: true, msg: 'deleted' })
  } catch (error) {
    next(error)
  }
}

export const updateListing = async (req: Request, res: Response, next: NextFunction) => {
  // console.log('updateListing', req.params)
  try {
    const listing = await Listing.findById(req.params.id)
    if (!listing) return next(errorHandler(404, 'Not found'))
    if (req.user._id !== listing.userRef) return next(errorHandler(401, 'Unauthorized'))

    const updated = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      // {
      //   $set: {
      //     name: req.body.name,
      //     description: req.body.description,
      //     address: req.body.address,
      //     regularPrice: req.body.regularPrice,
      //     discountPrice: req.body.discountPrice,
      //     bathrooms: req.body.bathrooms,
      //     bedrooms: req.body.bedrooms,
      //     furnished: req.body.furnished,
      //     parking: req.body.parking,
      //     type: req.body.type,
      //     offer: req.body.offer,
      //     imageUrls: req.body.imageUrls
      //   }
      // },
      {
        new: true
      }
    )

    return res.status(200).json(updated)
  } catch (error) {
    next(error)
  }
}

export const getListing = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const listing = await Listing.findById(req.params.id)
    if (!listing) return next(errorHandler(404, 'Not found1'))

    return res.status(200).json(listing)
  } catch (error) {
    next(error)
  }
}

export const getListings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const searchTerm = req.query.searchTerm || ''

    const filter = {
      name: { $regex: searchTerm, $options: 'i' },
      ...(req.query.offer === 'true' && { offer: true }),
      ...(req.query.furnished === 'true' && { furnished: true }),
      ...(req.query.parking === 'true' && { parking: true }),
      ...(['sale', 'rent'].includes(req.query.type as string) && { type: req.query.type })
    }

    const limit = parseInt(req.query.limit as string) || 9
    const startIndex = parseInt(req.query.startIndex as string) || 0
    // let offer = req.query.offer;

    // if (offer === undefined || offer === 'false') {
    //   offer = { $in: [false, true] };
    // }

    // let furnished = req.query.furnished;

    // if (furnished === undefined || furnished === 'false') {
    //   furnished = { $in: [false, true] };
    // }

    // let parking = req.query.parking;

    // if (parking === undefined || parking === 'false') {
    //   parking = { $in: [false, true] };
    // }

    // let type = req.query.type

    // if (type === undefined || type === 'all') {
    //   type = { $in: ['sale', 'rent'] }
    // }

    const sort = req.query.sort as string || 'createdAt'

    const order = req.query.order as SortOrder || 'desc'

    const listings = await Listing.find(filter)
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex)

    return res.status(200).json(listings)
  } catch (error) {
    next(error)
  }
}
