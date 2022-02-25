import {Request, Response} from 'express';
import userModel, {IUser} from '../models/userModel';
import bcrypt from 'bcrypt';
export const getUser = async (req:Request, res: Response)=>{
    try{
        const userId = req.params.id;
        const user:IUser|null = await userModel.findById<IUser>(userId);
        res.json({result: true, data: user, message: "get user success"});
    }
    catch(err){
        res.json({result: false, message: "fail to get user"});
    }
}

export const createUser = async (req:Request, res: Response)=>{
    try{
        const user:IUser = req.body; 
        user.password = await bcrypt.hash(user.password,9);
        const newUser = new userModel<IUser>(user);
        newUser.save();
        res.json({result: true, data: newUser, message: "create user success"});
    }
    catch(err){
        res.json({result: false, message: "fail to create user"});
    }
}

export const login = async (req:Request, res: Response)=>{
    try{
        const user:IUser = req.body;
        const getUser:IUser|null = await userModel.findOne({userName: user.userName});
        if(getUser){
            const isMatch:boolean = await bcrypt.compare(user.password, getUser.password);
            if(isMatch){
                res.json({result: true, data: getUser, message: "login success"});
            }
            else
                res.json({result: false,data: null, message: "password is not correct"});
        }
        else
            res.json({result: false,data: null, message: "user does not exist"});
    }
    catch(err){
        res.json({result: false, message: "fail to login"});
    }
}