import { Router } from "express";
import { userRegister } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/sign-up", userRegister);


export default userRouter;