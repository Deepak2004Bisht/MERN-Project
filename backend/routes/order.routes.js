import express from 'express'
import { authUser } from '../middlewares/authUser.js';
import { getAllOrders, getUserOrders, placeOrderCOD } from '../controllers/order.controller.js';
import { authSeller } from '../middlewares/authSeller.js';

const router  = express.Router();

// JO hamara Authenticate User hai vhi order placed kar sakhe
router.post('/cod', authUser, placeOrderCOD);

// Ye jitni user ki dot hongi usko ye get karega
router.get('/user', authUser, getUserOrders);

router.get('/seller', authSeller, getAllOrders);

export default router;