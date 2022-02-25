import { Express } from "express";
import helloRouter from "./helloRouter";
import todoRouter from "./todoRouter";
import userRouter from "./userRouter";
const routes = (app: Express)=>{
    app.use("/",helloRouter);
    app.use("/api/todo",todoRouter);
    app.use("/api/user",userRouter);
}
export default routes;