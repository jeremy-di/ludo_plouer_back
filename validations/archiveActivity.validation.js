import joi from "joi";

export default function archiveActivityValidation(body){
    const archiveActivityCreate = joi.object({
      member: joi.string().required(),
      nbOfChildrens: joi.number().required()
    })

    const archiveActivityUpdate = joi.object({
      member: joi.string(),
      nbOfChildrens: joi.number()
    })

    return {
        archiveActivityCreate: archiveActivityCreate.validate(body),
        archiveActivityUpdate: archiveActivityUpdate.validate(body),
    }
}
