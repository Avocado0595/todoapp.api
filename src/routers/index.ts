import { Express } from "express";
import helloRouter from "./helloRouter";
import statusRouter from "./statusRouter";
import todoRouter from "./todoRouter";
import userRouter from "./userRouter";
const routes = (app: Express)=>{
    app.use("/",helloRouter);
    app.use("/api/todo",todoRouter);
    app.use("/api/user",userRouter);
    app.use("/api/status",statusRouter);
}
export default routes;