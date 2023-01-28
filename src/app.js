import express from "express"
import cors from "cors"
// import productsRouter from "./routes/ProductsRouter.js";
import router from "./routes.js"


const server = express();

server.use(express.json());
server.use(cors());

// server.use(productsRouter);
server.use(router);
 
server.listen(5000, () => {console.log("Server running on port 5000")})

// schema e model representam a mesma pasta