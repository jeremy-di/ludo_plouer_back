import Activity from "../models/activity.model.js"
import archiveActivity from '../models/archiveActivity.model.js'
import activityValidation from "../validations/activity.validation.js"

const createActivity = async(req,res)=>{
    try {
        const {body} = req
        if(!body){
            return res.status(400).json({message: "no data in the request"})
        }
        const {error} = activityValidation(body).activityCreate
        if(error){
            return res.status(401).json(error.details[0].message)
        }
        const activity = new Activity(body)
        const newActivity = await activity.save()
        return res.status(201).json(newActivity)        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const getAllActivitys = async(req, res) => {
    try {
        const activitys = await Activity.find().populate("member", "lastName firstName")
        return res.status(200).json(activitys)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server Error", error: error})
    }
}

const getActivityById = async(req,res) => {
    try {
        const activity = await Activity.findById(req.params.id).populate("member", "lastName firstName")
        if(!activity){
            return res.status(404).json({message: "activity doesn't exist"})
        }
        return res.status(200).json(activity)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const updateActivity = async(req,res) => {
    try {
        const {body} = req
        if(!body){
            return res.status(400).json({message: "No data in the request"})
        }

        const {error} = activityValidation(body).activityUpdate
        if(error){
            return res.status(401).json(error.details[0].message)
        }
        const updatedActivity = await Activity.findByIdAndUpdate(req.params.id, body, {new: true}).populate("member", "lastName firstName")
        if(!updatedActivity){
            res.status(404).json({message: "activity doesn't exist"})
        }
        return res.status(200).json(updatedActivity)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

// const deleteActivity = async(req, res) => {
//     try {
//         const activity = await Activity.findByIdAndDelete(req.params.id)
//         if(!activity){
//             return res.status(404).json({message: "activity doesn't exist"})
//         }
//         return res.status(200).json({message: "activity has been deleted"})
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({message: "Server error", error: error})
//     }
// }

const archiveAllActivities = async (req, res) => {
    try {
        const activities = await Activity.find({}).lean()
        if ( !activities.length ) {
            return res.status(200).json({ msg : "Aucune activité à archiver." })
        }

        const archiveDocs = activities.map(({ _id, ...rest }) => ({
            ...rest,
            original_id: _id,
        }))

        await archiveActivity.insertMany(archiveDocs, { ordered: false });

        await Activity.deleteMany({ _id: { $in: activities.map(a => a._id) } });

        return res.status(200).json({
            message: `${activities.length} activité(s) archivées avec succès.`,
        });
    } catch (error) {
        console.error("Erreur d'archivage :", error);
        res.status(500).json({ message: "Erreur serveur", error });
    }
}

export { createActivity, getAllActivitys, getActivityById, updateActivity, archiveAllActivities }