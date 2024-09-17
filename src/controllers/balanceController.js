import { db } from "../config/database.js";
import { ObjectId } from 'mongodb';

export const postTransation = async (req, res) => {
  const transation = req.body;
  try {
    await db.collection("transactions").insertOne({ ...transation, userId: res.locals.user._id });
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export const getTransations = async (req, res) => {
  const page = req.query.page || 1;
  if ( page < 0 ) res.sendStatus(400);
  const limit = 10;
  const start = (page - 1) * limit;
  try {
    const transactions = await db.collection("transactions")
    .find({ userId: res.locals.user._id })
    .sort({ _id: -1 })
    .skip(start)
    .limit(limit)
    .toArray();
    res.status(200).send(transactions);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export const putTransation = async (req, res) => {
  const { id } = req.params
  const transation = req.body

  try {
    const transationExist = await db.collection('transactions').findOne({ _id: new ObjectId(id) });

    if (!transationExist) return res.status(404).send('Erro ao atualizar transação.');
    if (transationExist.userId === res.locals.user._id) return res.status(401).send('Erro ao atualizar transação.');

    await db.collection("transactions").updateOne({ _id: new ObjectId(id) },{ $set: {...transation, userId: transationExist.userId }});
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const deleteTransation = async (req, res) => {
  const { id } = req.params

  try {
    const transationExist = await db.collection('transactions').findOne({ _id: new ObjectId(id) });

    if (!transationExist) return res.status(404).send('Erro ao deletar transação.');
    if (transationExist.userId === res.locals.user._id) return res.status(401).send('Erro ao deletar transação.');

    await db.collection("transactions").deleteOne({ _id: new ObjectId(id) });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
}