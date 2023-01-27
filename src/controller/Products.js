import db from "../config/Database.js";

export async function postProducts(req, res) {
  const { name, description, value, pictures } = req.body;
  const newProduct = {
    name,
    description,
    value,
    pictures,
  };

  try {
    await db.collection("products").insertOne({ newProduct });
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(500).send("error");
  }
}

export async function getProducts(req, res) {
  try {
    const body = req.query;

    let productData = [];
    productData = await db.collection("products").find().toArray();
    return res.status(200).send(productData);
  } catch (error) {
    return res.status(500).send("error");
  }
}
