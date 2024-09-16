import joi from "joi";

export const userRegisterSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required().min(6),
  confirmPassword: joi.ref('password')
}).with('password', 'confirmPassword');

export const userLoginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required()
});