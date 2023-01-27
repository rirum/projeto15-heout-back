import db from "../config/Database.js";

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

    const cart = await db
      .collection("carts")
      .findOne({ _id: ObjectId(session.userID) });

    if (!cart)
      return res
        .status(404)
        .send("Houve um problema com a validação do usuário!");

    const cartProducts = cart.products;
    cartProducts.push(productID);

    await db
      .collection("carts")
      .updateOne({ _id: ObjectId(session.userID) }, { $set: {products: cartProducts} });
    res.sendStatus(201);
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
      .findOne({ _id: ObjectId(session.userID) });

    if (!cart)
      return res
        .status(404)
        .send("Houve um problema com a validação do usuário!");

    const cartProducts = cart.products;
    const productIndex = cartProducts.indexOf(ObjectId(productID));
    cartProducts.slice(productIndex, 1);

    await db
      .collection("carts")
      .updateOne({ _id: ObjectId(session.userID) }, { $set: {products: cartProducts} });
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(500).send("error");
  }
}
