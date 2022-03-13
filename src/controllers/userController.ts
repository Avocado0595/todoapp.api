import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/userModel';
import {getMongoRepository } from 'typeorm';
import IUserRequest from '../interfaces/IUserRequest';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import {ResponseData, ResponseErr, ResponseUser} from '../interfaces/ResponseData';

const getUserByName = async (name:string)=>{
    try{
        await getMongoRepository(User).findOneOrFail({where: {userName:name}});
        return true;
    }
    catch{
        return false;
    }
}   

export const getUser = async (req: IUserRequest, res: Response) => {
    try {
        const userId = req.params.id;
        if (req.userId === userId) {
            const userRepo = getMongoRepository(User);
            const user: User | undefined = await userRepo.findOneOrFail({where: {_id:  new ObjectId(userId)} });
            if (user)
            {
                res.json(new ResponseData("Get user success.", user ));
            }
            else
                res.json(new ResponseErr("User not found."));
        }
        else
        res.json(new ResponseErr("Token not found." ));
    }
    catch(err){
        res.json(new ResponseErr("fail to get user.",err));
    }
}

export const signUp = async (req:Request, res: Response)=>{

    try{
        const newuser:User = <User>req.body; 
        const user = new User();
        user.userName=newuser.userName;

        const checkUser = await getUserByName(newuser.userName);
        if(checkUser){
            res.json(new ResponseErr("User already exists."));
            return;
        }
        user.password=await bcrypt.hash(newuser.password,5);
        const userRepo = getMongoRepository(User);
        userRepo.save(user);
        const token:string = jwt.sign({id:user.id,userName: user.userName }, <string>process.env.SECRET_KEY, {expiresIn: "24h"});
        res.json(new ResponseUser("Create user success.", user, token));
    }
    catch(err){
        res.json(new ResponseErr("Fail to create user.",err));
    }
}

export const login = async (req: IUserRequest, res: Response) => {
    
        const user: User = <User>req.body;
        const userRepo = getMongoRepository(User);
        try {
        const getUser: User | undefined = await userRepo.findOneOrFail({ where: { userName: user.userName} });
            const validPassword = await bcrypt.compare(user.password, getUser.password);
            if (validPassword) {
                let token = jwt.sign({ id: getUser.id, userName: getUser.userName }, <string>process.env.SECRET_KEY, { expiresIn: "24h" });
                res.json(new ResponseUser("Login success.", {id:getUser.id,userName: getUser.userName}, token));
            }
            else
                res.json(new ResponseErr("Password is not correct."));
        }
        catch(err){
            res.json(new ResponseErr("User does not exist.", err));
        }
}