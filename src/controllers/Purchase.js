import db from "../database/Database.js";
import { ObjectId } from "mongodb";

export async function postPurchase(req, res) {
  const { cardNumber, cardExpiration, tokenCard } = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  try {
    const session = await db.collection("sessions").findOne({ token });

    if (!session)
      return res
        .status(404)
        .send("Usuário fora de uma sessão válida, faça login novamente!");

    let cart = await db
      .collection("carts")
      .findOne({ userId: ObjectId(session.user_id) });

    if (!cart) {
      return res.status(404).send("Erro interno - carrinho!");
    }

    const cartProducts = cart.products;
    let total = 0;

    cartProducts.map((product) => {
      total += Number(product.newProduct.value);
    });

    await db.collection("purchase").insertOne({
      userId: session.user_id,
      cardNumber,
      cardExpiration,
      tokenCard,
      products: cartProducts,
      total,
    });

    const purch = await db
      .collection("purchase")
      .findOne({ userId: ObjectId(session.user_id) });

    res.status(201).send(purch);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}
