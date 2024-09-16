import { Router } from "express";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import { userLoginSchema, userRegisterSchema } from "../schemas/userSchema.js";
import { userLogin, userRegister } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/sign-up", validateSchema(userRegisterSchema), userRegister);
userRouter.post("/sign-in", validateSchema(userLoginSchema), userLogin);

export default userRouter;