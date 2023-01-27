import { Router } from "express";

import { postProductCart, deleteProductsCart } from "../controller/Cart.js";

const cartRouter = Router();
productsRouter.post("/postProductCart", postProductCart);
productsRouter.put("/deleteProductsCart", deleteProductsCart);

export default cartRouter;