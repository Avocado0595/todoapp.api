import express, { Request, Response } from 'express';
import cors  from 'cors';
import routes from './routers';
import connect from './database';
import dotenv from 'dotenv';
const app = express();
const port = process.env.PORT || 3000;
dotenv.config();
connect();
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
routes(app);
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
