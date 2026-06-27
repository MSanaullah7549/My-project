import express from 'express';
import { checkoutOrder, getOrderDetails } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect);
router.post('/checkout', checkoutOrder);
router.get('/:id', getOrderDetails);

export default router;
