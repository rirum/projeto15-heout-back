import { Router } from "express";
import { auth } from '../middlewares/AuthMiddleware.js';
import { postProductCart, deleteProductsCart } from "../controllers/Cart.js";

const cartRouter = Router();
cartRouter.use(auth)
cartRouter.post("/postProductCart", postProductCart);
cartRouter.put("/deleteProductsCart", deleteProductsCart);

export default cartRouter;