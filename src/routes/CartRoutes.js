import { Router } from "express";
import { auth } from '../middlewares/AuthMiddleware.js';
import { postProductCart, deleteProductsCart, getCart } from "../controllers/Cart.js";

const cartRouter = Router();
cartRouter.use(auth);
cartRouter.get("/getCart", getCart);
cartRouter.post("/postProductCart", postProductCart);
cartRouter.put("/deleteProductsCart", deleteProductsCart);

export default cartRouter;