import { Router } from "express";

import { postProducts, getProducts } from "../controllers/Products.js";
import { validateSchema } from "../middlewares/ValidateSchema.js"
import { productSchema } from "../validations/ProductSchema.js";

const productsRouter = Router();
productsRouter.post("/products", validateSchema(productSchema), postProducts);
productsRouter.get("/products", getProducts);


export default productsRouter;