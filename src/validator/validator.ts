import Joi, { string } from "joi";

export const authSchema = Joi.object({
    title: Joi.string().min(4).required()
})
  
export const Option = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ""
        }
    }
}