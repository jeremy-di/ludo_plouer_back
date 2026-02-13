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

export { getAllArchiveActivitys, getArchiveActivityById }
