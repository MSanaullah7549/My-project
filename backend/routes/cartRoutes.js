import express from 'express';
import { saveCart, getCart } from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect);
router.get('/', getCart);
router.post('/save', saveCart);

export default router;
