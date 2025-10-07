
import { Router } from "express";
import { getAllArchiveActivitys, getArchiveActivityById } from "../controllers/archiveActivity.controller.js"

const router = Router()

// router.post('/new', createArchiveActivity)
router.get('/all', getAllArchiveActivitys)
router.get('/:id', getArchiveActivityById)
// router.put('/:id', updateArchiveActivity)
// router.delete('/:id', deleteArchiveActivity)

export default router