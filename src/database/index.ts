import dotenv from 'dotenv';
import { createConnection } from "typeorm";
import { Todo } from '../models/todoModel';
import {User} from "../models/userModel";
const connection = async () => {
	try {
		await createConnection({
			type: "mongodb",
			host: "localhost",
			port: 27017,
			database: "t1",
			useUnifiedTopology: true,
			entities: [
				User, Todo
			]
		});
		console.log("connect success!" );
	}
	catch (err) {
		console.log("connect db error: ", err);
	}
};
export default connection;
// import mongoose from 'mongoose';
// dotenv.config();
// const connect = async()=>{
// 	try{
// 		await mongoose.connect(<string>process.env.MONGO_URI);
// 		console.log("connect success!");
// 	}
// 	catch(err){
// 		console.log("connect db error: ", err);
// 	}

// }

// export default connect;
