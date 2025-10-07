import joi from "joi";

export default function memberValidation(body){
    const memberCreate = joi.object({
      lastName: joi.string().required(),
      firstName: joi.string().required(),
      address: joi.string().required(),
      zipCode: joi.number().required(),
      town: joi.string().required(),
      phoneNumber: joi.number().required(),
      email: joi.string().required()
    })

    const memberUpdate = joi.object({
      lastName: joi.string(),
      firstName: joi.string(),
      address: joi.string(),
      zipCode: joi.number(),
      town: joi.string(),
      phoneNumber: joi.number(),
      email: joi.string()
    })

    return {
        memberCreate: memberCreate.validate(body),
        memberUpdate: memberUpdate.validate(body),
    }
}
