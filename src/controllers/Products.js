import db from "../database/Database.js";
import products from "../data/products.js";

export async function postProducts(req, res) {
  const { name, description, value, pictures } = req.body;

  try {
    await db.collection("products").insertOne({
      name,
      description,
      value,
      pictures,
    });
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
    if (productData.length === 0 || !productData)
      await db.collection("products").insertMany(products);
    productData = await db.collection("products").find().toArray();
    res.status(200).send(productData);
  } catch (error) {
    return res.status(500).send("error");
  }
}
