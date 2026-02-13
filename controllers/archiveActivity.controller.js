import ArchiveActivity from "../models/archiveActivity.model.js"

const getAllArchiveActivitys = async(req, res) => {
    try {
        const archiveActivitys = await ArchiveActivity.find().populate("member", "lastName firstName")
        return res.status(200).json(archiveActivitys)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server Error", error: error})
    }
}

const getArchiveActivityById = async(req,res) => {
    try {
        const archiveActivity = await ArchiveActivity.findById(req.params.id).populate("member", "lastName firstName")
        if(!archiveActivity){
            return res.status(404).json({message: "archiveActivity doesn't exist"})
        }
        return res.status(200).json(archiveActivity)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

// const updateArchiveActivity = async(req,res) => {
//     try {
//         const {body} = req
//         if(!body){
//             return res.status(400).json({message: "No data in the request"})
//         }

//         const {error} = archiveActivityValidation(body).archiveActivityUpdate
//         if(error){
//             return res.status(401).json(error.details[0].message)
//         }
//         const updatedArchiveActivity = await ArchiveActivity.findByIdAndUpdate(req.params.id, body, {new: true})
//         if(!updatedArchiveActivity){
//             res.status(404).json({message: "archiveActivity doesn't exist"})
//         }
//         return res.status(200).json(updatedArchiveActivity)
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({message: "Server error", error: error})
//     }
// }

// const deleteArchiveActivity = async(req, res) => {
//     try {
//         const archiveActivity = await ArchiveActivity.findByIdAndDelete(req.params.id)
//         if(!archiveActivity){
//             return res.status(404).json({message: "archiveActivity doesn't exist"})
//         }
//         return res.status(200).json({message: "archiveActivity has been deleted"})
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({message: "Server error", error: error})
//     }
// }

export { getAllArchiveActivitys, getArchiveActivityById }
