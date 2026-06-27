import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Review from '../models/Review.js';
import { getPool } from '../config/mysql.js';

export const getStats = async (req, res, next) => {
  try {
    const productCount = await Product.countDocuments();
    const categoryCount = await Category.countDocuments();
    const reviewCount = await Review.countDocuments();
    const pool = getPool();
    const [[{ userCount }]] = await pool.query('SELECT COUNT(*) AS userCount FROM users');
    const [[{ orderCount }]] = await pool.query('SELECT COUNT(*) AS orderCount FROM orders');

    res.json({ productCount, categoryCount, reviewCount, userCount, orderCount });
  } catch (error) {
    next(error);
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, images, stock } = req.body;
    const product = await Product.create({ name, description, price, category, images, stock });
    res.status(201).json({ product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const updates = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ product });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const pool = getPool();
    const [users] = await pool.query('SELECT id, name, email, profile_picture, is_admin, created_at FROM users');
    res.json({ users });
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const pool = getPool();
    const [orders] = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json({ orders });
  } catch (error) {
    next(error);
  }
};
