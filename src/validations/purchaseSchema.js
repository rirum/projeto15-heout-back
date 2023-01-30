import joi from "joi";

export const purchaseSchema = joi.object({
  cardNumber: joi.number().required(),
  cardExpiration: joi.string().required(),
  tokenCard: joi.number().required(),
});