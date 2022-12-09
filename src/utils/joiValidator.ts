
import Joi, { string } from "joi";

export const authSchema = Joi.object({
  username: Joi.string().min(4).max(255).required(),
  firstname: Joi.string().min(4).max(255).required(),
  middlename: Joi.string().min(4).max(255).required(),
  lastname: Joi.string().min(4).max(255).required(),
  email: Joi.string().lowercase().email().min(4).max(255).trim().required(),
  phonenumber: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .required(),
  password: Joi.string().min(8).max(1024).required(),
  confirmpassword: Joi.ref("password"),
}).with("password", "confirmpassword");

export const Option = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};
export const authlogin = Joi.object({
  username: Joi.string().min(4).max(255).required(),
  email: Joi.string().lowercase().email().min(4).max(255).trim().required(),
  password: Joi.string().min(8).max(1024).trim().required(),
})

const loginOption = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};

export const passwordresetJoi = Joi.object({
  username: Joi.string().min(4).max(255).required(),
  password: Joi.string().min(8).max(1024).required(),
  confirmpassword: Joi.ref("password"),
}).with("password", "confirmpassword");

export const passwordresetOption = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};