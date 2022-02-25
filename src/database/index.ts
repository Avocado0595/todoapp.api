
import mongoose from 'mongoose';
const connect = async()=>{
	try{
		await mongoose.connect('mongodb://localhost:27017/todoDb');
		console.log("connect success!");
	}
	catch(err){
		console.log("connect db error: ", err);
	}

}

export default connect;