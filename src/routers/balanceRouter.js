import { Router } from "express";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import { newBalanceSchema } from "../schemas/balanceSchema.js";
import { deleteTransation, getTransations, postTransation, putTransation } from "../controllers/balanceController.js";
import { validateToken } from "../middlewares/authMiddleware.js";

const balanceRouter = Router();

balanceRouter.use(validateToken);

balanceRouter.post('/transactions', validateSchema(newBalanceSchema), postTransation);
balanceRouter.get('/transactions', getTransations);
balanceRouter.put('/transactions/:id', validateSchema(newBalanceSchema), putTransation);
balanceRouter.delete('/transactions/:id', deleteTransation);

export default balanceRouter;