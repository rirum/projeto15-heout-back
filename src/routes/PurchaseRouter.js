import { Router } from "express";

import { postPurchase } from "../controllers/Purchase.js";
import { validateSchema } from "../middlewares/ValidateSchema.js"
import { purchaseSchema } from "../validations/purchaseSchema.js";

const purchaseRouter = Router();

purchaseRouter.post("/purchase", validateSchema(purchaseSchema), postPurchase);

export default purchaseRouter;