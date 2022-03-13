import {Request, Response} from 'express';
import { User } from '../models/userModel';
interface MyRequest extends Request {
    token?: string,
    user?: User
}
export const getHello = (req:MyRequest, res: Response)=>{
    res.render("index");
}