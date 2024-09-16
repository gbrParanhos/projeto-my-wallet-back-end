import { Router } from "express";
import { userLogin, userRegister } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/sign-up", userRegister);
userRouter.post("/sign-in", userLogin);

export default userRouter;