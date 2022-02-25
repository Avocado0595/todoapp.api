
import { Schema, model, Types } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface ITodo {
  title: string;
  description?: string;
  startTime?: Date;
  endTime?: Date;
  userId: Types.ObjectId;
  statusId: Types.ObjectId;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<ITodo>({
  title: {type: String, required: true},
  description: {type: String},
  startTime: {type: Date},
  endTime: {type: Date},
  userId: {type: Schema.Types.ObjectId, required: true},
  statusId: {type: Schema.Types.ObjectId, required: true}
},{timestamps:true});

// 3. Create a Model.
export default model<ITodo>('todo', schema);
