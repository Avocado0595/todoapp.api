import express from "express";
import { getHello } from "../controllers/helloController";
import verifyUser from "../middlewares/verifyUser";
const routes = express.Router();

routes.get("/", getHello);

export default routes;