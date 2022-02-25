
import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface IUser {
  userName: string;
  password: string;
  avatarPath?: string;
  email?: string;
  displayName?: string;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IUser>({
    userName: {type: String, required: true},
    password: {type: String, required: true},
    avatarPath: {type: String},
    email: {type: String},
    displayName: {type: String},
},{timestamps:true});

// 3. Create a Model.
export default model<IUser>('user', schema);
