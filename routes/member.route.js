
import { Router } from "express";
import { createMember, getAllMembers, getMemberById, updateMember, deleteMember } from "../controllers/member.controller.js"

const router = Router()

router.post('/new', createMember)
router.get('/all', getAllMembers)
router.get('/:id', getMemberById)
router.put('/:id', updateMember)
router.delete('/:id', deleteMember)

export default router