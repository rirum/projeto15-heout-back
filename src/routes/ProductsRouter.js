import { Router } from "express";
import { validateSchema } from "../middleware/ValidateSchema.js";
import { getProducts, postProducts } from "../controller/Products.js";
import { productSchema } from "../schema/ProductSchema.js";

const productsRouter = Router();
productsRouter.post("/products", validateSchema(productSchema), postProducts);
productsRouter.get("/products", getProducts);


export default productsRouter;