import { Response} from 'express';
import { ObjectId } from 'mongodb';
import { getMongoRepository } from 'typeorm';
import IUserRequest from '../interfaces/IUserRequest';
import { ResponseData, ResponseErr } from '../interfaces/ResponseData';
import {Todo} from '../models/todoModel';
interface Pagination{
    page: number;
    limit: number;
}

export const getTodoList = async (req:IUserRequest, res: Response)=>{
    try{
        const pagination = req.query as unknown as Pagination;
        pagination.limit = pagination.limit ? parseInt(pagination.limit.toString()) : 10;
        pagination.page = pagination.page ? parseInt(pagination.page.toString()) : 1;
        const userId = req.userId;
        const todoRepo = getMongoRepository(Todo);
        const todoList: Array<Todo> | [] = await (await todoRepo.find({where: {userId: userId} })).slice((pagination.page-1)*pagination.limit,pagination.page*pagination.limit+pagination.limit);
        res.json({result: true, data: todoList, message: "Get todo list success."});
    }
    catch(err){
        res.json({result: false, message: "Fail to get todo list." });
    }
}

export const getTodo = async (req:IUserRequest, res: Response)=>{
    try{
        const todoId = req.params.id;
        const userId = req.userId;
        const todoRepo = getMongoRepository(Todo);
        const todo: Todo | undefined = await todoRepo.findOne({where: {_id: new ObjectId(todoId),userId: userId} });
        if(todo)
            res.json({result: true, data: todo, message:"get todo success"});
        else
            res.json({result: false, message: "todo not found"});
    }
    catch(err){
        res.json({result: false, message: "fail to get todo"});
    }
}
export const createTodo = async (req:IUserRequest, res:Response)=>{
    try{
        const newTodo:Todo = req.body;
        newTodo.startTime = new Date(newTodo.startTime);
        newTodo.endTime = new Date(newTodo.endTime);
        newTodo.userId = req.userId??'';
        const todoRepo = getMongoRepository(Todo);
        await todoRepo.save(newTodo);
        res.json({result: true, data: newTodo, message: "todo created"});
        
    }
    catch(err){
        res.json({result: false, message: req.body + 'fail to create new todo' + err});
    }
}
export const updateTodo = async (req:IUserRequest, res:Response)=>{
        const todoId = req.params.id;
        const userId = req.userId;
        const updateTodo:Todo = req.body;
        updateTodo.startTime = new Date(updateTodo.startTime);
        updateTodo.endTime = new Date(updateTodo.endTime);
        const todoRepo = getMongoRepository(Todo);
        try{
            await todoRepo.findOneAndUpdate({_id: new ObjectId(todoId),userId: userId}, {$set: updateTodo});
            res.json(new ResponseData("Update success.",updateTodo));

        }
        catch(err){
            res.json(new ResponseErr('Update fail.'));

        }
}
export const deleteTodo = async (req:IUserRequest, res:Response)=>{

    try{
        const todoId = req.params.id;
        const userId = req.userId;
        const todoRepo = getMongoRepository(Todo);
        await todoRepo.findOneAndDelete({_id: new ObjectId(todoId),userId: userId});
        res.json(new ResponseData('Delete success', todoId));
    }
    catch(err){
        res.json(new ResponseErr('Delete fail'));
    }
}