import { IRoute, Router } from "express";
import {getTodoList, createTodo, updateTodo, getTodo, deleteTodo} from "../controllers/todoController";
const route = Router();
route.get("/",getTodoList);
route.post("/",createTodo);
route.get("/:id",getTodo);
route.put("/:id",updateTodo);
route.delete("/:id",deleteTodo);
export default route;