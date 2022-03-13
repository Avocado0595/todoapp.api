import {Request} from 'express';

export default interface IUserRequest extends Request {
    token?: string,
    userId?: string,
}