import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import { getStats, addProduct, updateProduct, deleteProduct, getUsers, getOrders } from '../controllers/adminController.js';

const router = express.Router();
router.use(protect, admin);
router.get('/stats', getStats);
router.post('/products', addProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);
router.get('/users', getUsers);
router.get('/orders', getOrders);

export default router;
