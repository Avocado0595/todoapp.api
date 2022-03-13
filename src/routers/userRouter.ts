
import { Router } from "express";
import {signUp, getUser, login} from "../controllers/userController";
import verifyUser from "../middlewares/verifyUser";
const route = Router();

route.post("/signup",signUp);
route.post("/login",login);
route.get("/:id",verifyUser, getUser);
export default route;