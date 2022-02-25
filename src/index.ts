import express, { Request, Response } from 'express';
import cors  from 'cors';
import routes from './routers';
import connect from './database';
const app = express();
const port = 3000;

connect();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
routes(app);
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
