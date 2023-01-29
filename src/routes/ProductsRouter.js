import { Router } from "express";



const productsRouter = Router();
productsRouter.post("/products", validateSchema(productSchema), postProducts);
productsRouter.get("/products", getProducts);


export default productsRouter;