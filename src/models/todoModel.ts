import {Entity, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
import Status from "../interfaces/StatusType";

@Entity('todo') 
export class Todo {
    
    @ObjectIdColumn()
    id: string;
    
    @Column()
    title: string;
    
    @Column()
    description: string;

    @Column()
    startTime: Date;

    @Column()
    endTime: Date;

    @Column()
    userId: string;

    @Column()
    status: Status;

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
}






// import { Schema, model, Types } from 'mongoose';

// // 1. Create an interface representing a document in MongoDB.
// export interface ITodo {
//   title: string;
//   description?: string;
//   startTime?: Date;
//   endTime?: Date;
//   userId: Types.ObjectId;
//   statusId: Types.ObjectId;
// }

// // 2. Create a Schema corresponding to the document interface.
// const schema = new Schema<ITodo>({
//   title: {type: String, required: true},
//   description: {type: String},
//   startTime: {type: Date},
//   endTime: {type: Date},
//   userId: {type: Schema.Types.ObjectId,ref:'users'},
//   statusId: {type: Schema.Types.ObjectId,ref:'status'}
// },{timestamps:true});

// // 3. Create a Model.
// export default model<ITodo>('todos', schema);
