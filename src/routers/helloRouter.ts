import express from "express";
import { getHello } from "../controllers/helloController";
const routes = express.Router();

routes.get("/", getHello);

export default routes;