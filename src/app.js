import 'dotenv/config';
import express, { json } from "express";
import cors from "cors";
import userRouter from './routers/userRouter.js';
import balanceRouter from './routers/balanceRouter.js';

const app = express();
app.use(cors());
app.use(json());

app.use(userRouter);
app.use(balanceRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Running in port ${port}`);
})