
import { Router } from "express";
import { register, login, getAllUsers, getUserById, updateUser, deleteUser, updateMe, updateMyPassword, getMe } from "../controllers/user.controller.js"
import auth from '../middlewares/auth.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/all', getAllUsers)
router.get('/:id', getUserById)
router.get('/profil/me', auth, getMe)
router.put('/:id', updateUser)
router.patch('/updateme', auth, updateMe)
router.patch('/updatemypass', auth, updateMyPassword)
router.delete('/:id', deleteUser)

export default router