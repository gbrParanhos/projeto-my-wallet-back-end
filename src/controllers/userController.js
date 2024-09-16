import 'dotenv/config';
import bcrypt from "bcrypt";
import { db } from "../config/database.js";
import jwt from "jsonwebtoken"

export const userRegister = async (req, res) => {
  const { name, email, password } = req.body;

  try {
		const user = await db.collection("users").findOne({ email });
    if (user) return res.status(409).send("E-mail já cadastrado");

		const hash = bcrypt.hashSync(password, 10);

    await db.collection("users").insertOne({ name, email, password: hash });
    res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.collection('users').findOne({ email });
    
    if(!user) return res.status(404).send("E-mail e senha incompatíveis.");
    if(!bcrypt.compareSync(password, user.password)) return res.status(401).send("E-mail e senha incompatíveis.");
        
    const token = jwt.sign({ userId:user._id }, process.env.JWT_SECRET);
    return res.status(200).send(token);
    
  } catch (err) {
    return res.status(500).send(err.message);
  }
}