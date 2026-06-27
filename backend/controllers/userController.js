import bcrypt from 'bcrypt';
import validator from 'validator';
import { getPool } from '../config/mysql.js';

export const getProfile = async (req, res, next) => {
  try {
    const pool = getPool();
    const [users] = await pool.query('SELECT id, name, email, profile_picture, is_admin, created_at FROM users WHERE id = ?', [req.user.id]);
    const user = users[0];
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, profile_picture } = req.body;
    const pool = getPool();
    await pool.query('UPDATE users SET name = ?, profile_picture = ? WHERE id = ?', [name, profile_picture, req.user.id]);
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current and new passwords are required' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const pool = getPool();
    const [users] = await pool.query('SELECT password FROM users WHERE id = ?', [req.user.id]);
    const user = users[0];
    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, req.user.id]);
    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const pool = getPool();
    const [orders] = await pool.query('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]);
    res.json({ orders });
  } catch (error) {
    next(error);
  }
};
