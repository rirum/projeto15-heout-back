import db from "../database/Database.js";
import { ObjectId } from "mongodb";

export async function getCart(req, res) {
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
      .findOne({ userId: session.user_id });

    if (!cart) {
      const newCart = {
        userId: session.user_id,
        products: [],
      };

      await db.collection("carts").insertOne(newCart);

      cart = newCart;
    }

    res.status(200).send(cart);
  } catch (error) {
    console.log(error);
    return res.status(500).send("error");
  }
}

export async function postProductCart(req, res) {
  const { productID } = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  try {
    const productExists = await db
      .collection("products")
      .findOne({ _id: ObjectId(productID) });

    if (!productExists)
      return res.status(404).send("O produto selecionado é inválido!");

    const session = await db.collection("sessions").findOne({ token });

    if (!session)
      return res
        .status(404)
        .send("Usuário fora de uma sessão válida, faça login novamente!");

    let cart = await db
      .collection("carts")
      .findOne({ userId: session.user_id });

    if (!cart) {
      const newCart = {
        userId: session.user_id,
        products: [productExists],
      };
      await db.collection("carts").insertOne(newCart);
      cart = newCart;
    }

    const cartProducts = cart.products;
    cartProducts.push(productExists);

    await db
      .collection("carts")
      .updateOne(
        { userId: session.user_id },
        { $set: { products: cartProducts } }
      );
    res.status(201).send(cart);
  } catch (error) {
    console.log(error);
    return res.status(500).send("error");
  }
}

export async function deleteProductsCart(req, res) {
  const { productID } = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  try {
    const productExists = await db
      .collection("products")
      .findOne({ _id: ObjectId(productID) });

    if (!productExists)
      return res.status(404).send("O produto selecionado é inválido!");

    const session = await db.collection("sessions").findOne({ token });

    if (!session)
      return res
        .status(404)
        .send("Usuário fora de uma sessão válida, faça login novamente!");

    const cart = await db
      .collection("carts")
      .findOne({ userId: ObjectId(session.user_id) });

    if (!cart)
      return res
        .status(404)
        .send("Houve um problema com a validação do usuário!");

    const cartProducts = cart.products;
    let productIndex = -1;

    cartProducts.map((item, i) => {
      if (item._id.toString() == productID) {
        productIndex = i;
        return;
      }
    });
    cartProducts.splice(productIndex, 1);

    await db
      .collection("carts")
      .updateOne(
        { userId: ObjectId(session.user_id) },
        { $set: { products: cartProducts } }
      );

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).send("error");
  }
}
