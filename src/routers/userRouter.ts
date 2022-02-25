import { Router } from "express";
import {createUser, getUser, login} from "../controllers/userController";
const route = Router();

route.post("/",createUser);
route.get("/:id",getUser);
route.post("/login",login);
export default route;