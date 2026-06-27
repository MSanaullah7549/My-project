import express from 'express';
import { getProfile, updateProfile, changePassword, getMyOrders } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.put('/change-password', changePassword);
router.get('/orders', getMyOrders);

export default router;
