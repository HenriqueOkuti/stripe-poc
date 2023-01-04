import { Router } from 'express';
import { mid } from '../middleware/middleware.js';

const serverRouter = Router();
serverRouter
	.get('/items', mid.sendItems)
	.post('/order', mid.handleOrder)
	.get('/history', mid.handleHistory)
	.get('/verify', mid.verifyPayment);

export default serverRouter;
