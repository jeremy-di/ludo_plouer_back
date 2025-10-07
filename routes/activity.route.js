
import { Router } from "express";
import { createActivity, getAllActivitys, getActivityById, updateActivity, archiveAllActivities } from "../controllers/activity.controller.js"

const router = Router()

router.post('/new', createActivity)
router.post('/archive', archiveAllActivities)
router.get('/all', getAllActivitys)
router.get('/:id', getActivityById)
router.put('/:id', updateActivity)
// router.delete('/:id', deleteActivity)

export default router