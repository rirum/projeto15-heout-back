import Joi from "joi";
import { validator } from "./validator.js";

const registerSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().required(),
	password_confirmation: Joi.ref('password')
}).with('password', 'password_confirmation');

export const validateRegisterSchema = validator(registerSchema);