import dayjs from "dayjs";
import db from "../database.js";

export async function auth (req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) return res.sendStatus(401);

  const session = await db.collection("sessions").findOne({ token });

  if (!session || dayjs().isAfter(session.expires_at)) return res.sendStatus(401);

  res.locals.authId = session.user_id;
  next();
}