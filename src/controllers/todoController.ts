import {Request, Response} from 'express';
import todoModel, {ITodo} from '../models/todoModel';

export const getTodoList = async (req:Request, res: Response)=>{
    try{
        const todoList:Array<ITodo> = await todoModel.find<ITodo>();
        res.json({result: true, data: todoList, message: "get todo list success"});
    }
    catch(err){
        res.json({result: false, message: "fail to get todo list"});
    }
}
export const getTodo = async (req:Request, res: Response)=>{
    try{
        const todoId = req.params.id;
        const todo:ITodo|null = await todoModel.findById<ITodo>(todoId);
        if(todo)
            res.json({result: true, data: todo, message:"get todo success"});
        else
            res.json({result: true,data:todo, message: "todo not found"});
    }
    catch(err){
        res.json({result: false, message: "fail to get todo"});
    }
}
export const createTodo = async (req:Request, res:Response)=>{
    try{
        // const newTodo:ITodo = {title: "todo2", description: "todo2 description", 
        // startTime: new Date(), userId: new Types.ObjectId(), statusId: new Types.ObjectId()};
        const newTodo:ITodo = req.body;
        const todo = new todoModel<ITodo>(newTodo);
        await todo.save();
        res.json({result: true, data: todo, message: "todo created"});
        
    }
    catch(err){
        res.json({result: false, message: req.body + 'fail to create new todo' + err});
    }
}
export const updateTodo = async (req:Request, res:Response)=>{

    try{
        const todoId:string= req.params.id;
        const todo:ITodo|null = await todoModel.findById<ITodo>(todoId);
        if(todo){
            const newTodo:Partial<ITodo> = req.body; 
            await todoModel.findOneAndUpdate<ITodo>({_id:todoId}, newTodo);
            res.json({result: true, data: newTodo, message: `updated ${todoId}`});
        }
        else
            res.json({result: true,data: todo, message: 'id does not exist'});
    }
    catch(err){
        res.json({result: false, message: 'fail to update todo'});
    }
}
export const deleteTodo = async (req:Request, res:Response)=>{

    try{
        const todoId:string= req.params.id;
        const todo:ITodo|null = await todoModel.findById<ITodo>(todoId);
        if(todo){
            await todoModel.findOneAndDelete<ITodo>({_id:todoId});
            res.json({result: true, data: todo, message: `deleted ${todoId}`});
        }
        else
            res.json({result: true,data: todo, message: 'id does not exist'});
        
    }
    catch(err){
        res.json({result: false, message: 'fail to delete todo'});
    }
}