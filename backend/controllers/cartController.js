import { getPool } from '../config/mysql.js';

export const saveCart = async (req, res, next) => {
  try {
    const { cartData } = req.body;
    const pool = getPool();
    await pool.query('UPDATE users SET cart_data = ? WHERE id = ?', [JSON.stringify(cartData || []), req.user.id]);
    res.json({ message: 'Cart saved successfully' });
  } catch (error) {
    next(error);
  }
};

export const getCart = async (req, res, next) => {
  try {
    const pool = getPool();
    const [users] = await pool.query('SELECT cart_data FROM users WHERE id = ?', [req.user.id]);
    const user = users[0];
    const cartData = user.cart_data ? JSON.parse(user.cart_data) : [];
    res.json({ cartData });
  } catch (error) {
    next(error);
  }
};
