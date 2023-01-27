import joi from "joi";

export const productSchema = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
  value: joi.number().required(),
  pictures: joi.array().items(joi.string().required()).required(),
});