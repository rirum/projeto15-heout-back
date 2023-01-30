import joi from "joi";

export const purchaseSchema = joi.object({
  cardNumber: joi.number().required(),
  cardExpiration: joi.date().required(),
  tokenCard: joi.any().required(),
});