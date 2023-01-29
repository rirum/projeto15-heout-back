import express from "express"
import cors from "cors"
import authRouter from "./routes/AuthRoutes.js";
import cartRouter from "./routes/CartRoutes.js";
import productsRouter from "./routes/ProductsRouter.js";


const server = express();

server.use(express.json());
server.use(cors());

server.use([authRouter,cartRouter,productsRouter]);
    
server.listen(5000, () => {console.log("Server running on port 5000")})

