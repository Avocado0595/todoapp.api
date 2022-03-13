import express from "express";
import { getStatusList } from "../controllers/statusController";
import verifyUser from "../middlewares/verifyUser";
const routes = express.Router();

routes.get("/", getStatusList);

export default routes;