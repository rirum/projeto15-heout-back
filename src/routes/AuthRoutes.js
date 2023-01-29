import { Router } from "express";
import { register, authenticate } from '../controllers/AuthController.js';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/authenticate', authenticate);

export default authRouter;