import express from "express"
import cors from "cors"
import productsRouter from "./routes/ProductsRouter.js";

const server = express();

server.use(express.json());
server.use(cors());

server.use(productsRouter);

server.listen(5000, () => {console.log("Server running on port 5000")})