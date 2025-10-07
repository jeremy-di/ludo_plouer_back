import joi from "joi";

export default function userValidation(body){
    const userCreate = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
      lastName: joi.string().required(),
      firstName: joi.string().required(),
      role: joi.boolean()
    })

    const userUpdate = joi.object({
      email: joi.string().email(),
      lastName: joi.string(),
      firstName: joi.string(),
    })
    const userUpdateMe = joi.object({
      lastName: joi.string(),
      firstName: joi.string(),
    })

    const userLogin = joi.object({
      email: joi.string().email(),
      password: joi.string(),
    })

    return {
        userCreate: userCreate.validate(body),
        userUpdate: userUpdate.validate(body),
        userUpdateMe: userUpdateMe.validate(body),
        userLogin: userLogin.validate(body),
    }
}
