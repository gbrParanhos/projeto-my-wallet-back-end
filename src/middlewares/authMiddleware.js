import 'dotenv/config';
import { db } from "../config/database.js";
import { ObjectId } from 'mongodb';
import jwt from "jsonwebtoken";

export const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).send('Um Token válido deve ser informado');
  
  try {
    jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
      if (error) return res.status(401).send('Um Token válido deve ser informado');

      const user = await db.collection('users').findOne({ _id: new ObjectId(decoded.userId) });
      
      if (!user) return res.status(401).send('Um Token válido deve ser informado');

      res.locals.user = user;
      next();
    })
  } catch (err) {
    return res.status(500).send(err.message);
  }
}