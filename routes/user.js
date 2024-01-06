import express from 'express'

import {
  registerUser,
  getUsers,
  deleteUser,
  getUserBYId,
} from '../controllers/user.js'
import { isLoggedIn } from '../middlewares/auth.js'
import { upload } from '../middlewares/uploads.js'

upload
const router = express.Router()

router
  .route('/')
  .post(upload.single('data'), registerUser)
  .get(getUsers)
  .delete(deleteUser)

router.route('/:id').get(getUserBYId)

export { router }
