import express from 'express';
import cors from 'cors';
import { register, authenticate } from './controllers/AuthController.js';
import { auth } from './middlewares/AuthMiddleware.js';
import { getProducts, postProducts } from "./controllers/Products.js";
import { postProductCart, deleteProductsCart } from "./controllers/Cart.js";
import { productSchema } from "./schema/ProductSchema.js";
import { validateSchema } from "./middleware/ValidateSchema.js";

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/register', register);
router.post('/authenticate', authenticate);
router.get("/products", getProducts);
router.post("/products", validateSchema(productSchema), postProducts);

router.use(auth);

router.post("/postProductCart", postProductCart);
router.put("/deleteProductsCart", deleteProductsCart);

export default router;