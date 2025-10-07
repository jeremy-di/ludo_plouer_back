import Member from "../models/member.model.js"
import memberValidation from "../validations/member.validation.js"

const createMember = async(req,res)=>{
    try {
        const {body} = req
        if(!body){
            return res.status(400).json({message: "no data in the request"})
        }
        const {error} = memberValidation(body).memberCreate
        if(error){
            return res.status(401).json(error.details[0].message)
        }
        const member = new Member(body)
        const newMember = await member.save()
        return res.status(201).json(newMember)        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const getAllMembers = async(req, res) => {
    try {
        const members = await Member.find()
        return res.status(200).json(members)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server Error", error: error})
    }
}

const getMemberById = async(req,res) => {
    try {
        const member = await Member.findById(req.params.id)
        if(!member){
            return res.status(404).json({message: "member doesn't exist"})
        }
        return res.status(200).json(member)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const updateMember = async(req,res) => {
    try {
        const {body} = req
        if(!body){
            return res.status(400).json({message: "No data in the request"})
        }

        const {error} = memberValidation(body).memberUpdate
        if(error){
            return res.status(401).json(error.details[0].message)
        }
        const updatedMember = await Member.findByIdAndUpdate(req.params.id, body, {new: true})
        if(!updatedMember){
            res.status(404).json({message: "member doesn't exist"})
        }
        return res.status(200).json(updatedMember)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const deleteMember = async(req, res) => {
    try {
        const member = await Member.findByIdAndDelete(req.params.id)
        if(!member){
            return res.status(404).json({message: "member doesn't exist"})
        }
        return res.status(200).json({message: "member has been deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

export { createMember, getAllMembers, getMemberById, updateMember, deleteMember }