import joi from "joi";

export default function activityValidation(body){
    const activityCreate = joi.object({
      member: joi.string().required(),
      nbOfChildrens: joi.number().required()
    })

    const activityUpdate = joi.object({
      member: joi.string(),
      nbOfChildrens: joi.number()
    })

    return {
        activityCreate: activityCreate.validate(body),
        activityUpdate: activityUpdate.validate(body),
    }
}
