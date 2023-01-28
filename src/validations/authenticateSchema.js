import Joi from "joi";
import { validator } from "./validator.js";

const authenticateSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

export const validateAuthenticateSchema = validator(authenticateSchema);