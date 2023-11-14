import express from 'express'
import { deleteUser, getUser, getUserListings, updateUser } from '../controllers/user.controller'
import { verifyToken } from '../utils/verify-user'

const router = express.Router()

router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/listings/:id', verifyToken, getUserListings)
router.get('/:id', verifyToken, getUser)

export default router
