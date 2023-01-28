import * as bcrypt from 'bcrypt';
import db from "../database.js";
import { User } from "../models/User.js";
import { validateAuthenticateSchema } from "../validations/authenticateSchema.js";
import { validateRegisterSchema } from "../validations/registerSchema.js";
import { AuthToken } from '../models/AuthToken.js';

export async function register (req, res) {
  const { name, email, password, error } = await validateRegisterSchema(req.body);

  if (error) return res.status(422).send(error);

  try {
    const emailExist = await db.collection("users").findOne({ email });
    if (emailExist) return res.sendStatus(409);
    const user = new User(
      name,
      email,
      bcrypt.hashSync(password, 10)
    );
    await db.collection("users").insertOne(user);
    return res.sendStatus(201);
  }
  catch (error) {
    return res.status(500).send(error);
  }
}

export async function authenticate (req, res) {
  const { email, password, error } = validateAuthenticateSchema(req.body);
  if (error) return res.status(422).send(error);

  try {
    const user = await db.collection("users").findOne({ email });

    if (!user) return res.status(400).send('E-mail ou senha inválidos');

    const matchPasswords = await bcrypt.compare(password, user.password);

    if (!matchPasswords) return res.status(400).send('E-mail ou senha inválidos');

    const token = new AuthToken();

    await db.collection("sessions").updateOne({
      user_id: user._id
    }, {
      $set: {
        user_id: user._id,
        token: token.uuid,
        expire_at: token.expire_at
      }
    }, { upsert: true });

    return res.send({
      token: token.uuid,
      expire_at: token.expire_at,
      user: {
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    return res.status(500).send(error);
  }
}