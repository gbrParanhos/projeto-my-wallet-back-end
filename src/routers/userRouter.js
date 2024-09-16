import { Router } from "express";
import { userLoginSchema, userRegisterSchema } from "../schemas/userSchema.js";
import { userLogin, userRegister } from "../controllers/userController.js";
import { validateSchema } from "../middlewares/schemaMiddleware.js";

const userRouter = Router();

userRouter.post("/sign-up", validateSchema(userRegisterSchema), userRegister);
userRouter.post("/sign-in", validateSchema(userLoginSchema), userLogin);

export default userRouter;