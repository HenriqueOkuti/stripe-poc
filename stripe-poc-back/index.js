import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import serverRouter from './router/router.js';

dotenv.config();

const server = express();
server.use(express.json()).use(cors()).use(serverRouter);

server.listen(process.env.PORT, () =>
	console.log(`Listening on ${process.env.PORT}`)
);
