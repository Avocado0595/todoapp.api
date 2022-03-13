import {Request, Response} from 'express';
import Status from '../interfaces/StatusType';

export const getStatusList= (req:Request, res: Response)=>{
    const statusList:Array<String> = Object.keys(Status).filter(key => isNaN(Number(key)));
    res.send(statusList);
}