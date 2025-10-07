
import User from "../models/user.model.js"
import userValidation from "../validations/user.validation.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const register = async(req,res)=>{
    try {
        const {body} = req
        if(!body){
            return res.status(400).json({message: "No data in the request"})
        }
        const {error} = userValidation(body).userCreate
        if(error){
            return res.status(401).json(error.details[0].message)
        }
        const searchUser = await User.findOne({email: body.email})
        if(searchUser){
            return res.status(401).json({message: "user already exists"})
        }
        const user = new User(body)
        const newUser = await user.save()
        return res.status(201).json(newUser)        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const login = async(req, res) => {
    try {
        const {email, password } = req.body
        const { error } = userValidation(req.body).userLogin
    
        if(error){
            return res.status(401).json(error.details[0].message)
        }

        const user = await User.findOne({ email: email})
        if(!user){
            return res.status(400).json({message: "Email ou mot de passe incorrect"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message: "Email ou mot de passe incorrect"})
        }
        res.status(200).json({
            message: user.email+" is connected",
            firstName : user.firstName,
            token: jwt.sign({ id: user._id, email:  user.email, lastName: user.lastName, firstName: user.firstName }, process.env.SECRET_KEY, { expiresIn: "12h" })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const getAllUsers = async(req, res) => {
    try {
        const users = await User.find().select("-password")
        return res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const getUserById = async(req,res) => {
    try {
        const user = await User.findById(req.params.id).select("-password")
        if(!user){
            return res.status(404).json({message: "user doesn't exist"})
        }
        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const updateUser = async(req,res) => {
    try {
        const {body} = req
        if(!body){
            return res.status(400).json({message: "No data in the request"})
        }

        const {error} = userValidation(body).userUpdate
        if(error){
            return res.status(400).json(error.details[0].message)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, body, {new: true}).select("-password")
        if(!updatedUser){
            res.status(404).json({message: "user doesn't exist"})
        }
        return res.status(200).json(updatedUser)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const updateMe = async (req, res) => {
    try {
        const { lastName, firstName, email } = req.body;

        if (!lastName && !firstName && !email) {
        return res.status(400).json({ message: "No data to update" });
        }

        const { error } = userValidation(req.body).userUpdateMe
        if (error) {
        return res.status(401).json(error.details[0].message);
        }

        const userId = req.user?.id || req.user?._id;

        const updatedUser = await User.findByIdAndUpdate(
        userId,
        { lastName, firstName },
        { new: true, runValidators: true, context: "query" }
        ).select("-password");

        if (!updatedUser) {
        return res.status(404).json({ message: "User doesn't exist" });
        }

    return res.status(200).json(updatedUser);
    }  catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error });
  }
}

const updateMyPassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;

        if (!oldPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required" });
        }

        if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: "Les mots de passe ne correspondent pas" });
        }

        const userId = req.user?.id
        if (!userId) {
        return res.status(400).json({ message: "Unauthorized" });
        }

        const user = await User.findById(userId).select("+password");
        if (!user) {
        return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
        return res.status(400).json({ message: "L'ancien mot de passe est incorrect" });
        }

        user.password = newPassword;
        await user.save();

        return res.status(200).json({ message: "Le mot de passe à bien été modifié" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error });
    }
}

const deleteUser = async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).json({message: "user doesn't exist"})
        }
        return res.status(200).json({message: "user a été supprimé"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

export { register, login, getAllUsers, getUserById, getMe, updateUser, updateMe, updateMyPassword, deleteUser }