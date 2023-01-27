import { Router } from "express";

import { getProducts, postProducts } from "../controller/Products.js";

const productsRouter = Router();
productsRouter.post("/products", postProducts);
productsRouter.get("/products", getProducts);


export default productsRouter;