import { getPool } from '../config/mysql.js';

export const checkoutOrder = async (req, res, next) => {
  try {
    const { shippingAddress, paymentMethod, cartItems } = req.body;
    if (!shippingAddress || !paymentMethod || !Array.isArray(cartItems)) {
      return res.status(400).json({ message: 'Checkout information is incomplete' });
    }

    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const pool = getPool();
    const [orderResult] = await pool.query(
      'INSERT INTO orders (user_id, total_amount, shipping_address, status) VALUES (?, ?, ?, ?)',
      [req.user.id, totalAmount, shippingAddress, 'Completed']
    );

    const orderId = orderResult.insertId;
    const insertItems = cartItems.map((item) => [orderId, item.id, item.name, item.quantity, item.price, item.price * item.quantity]);
    await pool.query(
      'INSERT INTO order_items (order_id, product_id, name, quantity, price, total) VALUES ?',
      [insertItems]
    );

    await pool.query(
      'INSERT INTO payments (order_id, payment_method, amount, status) VALUES (?, ?, ?, ?)',
      [orderId, paymentMethod, totalAmount, 'Paid']
    );

    await pool.query('UPDATE users SET cart_data = ? WHERE id = ?', [JSON.stringify([]), req.user.id]);
    res.status(201).json({ message: 'Order placed successfully', orderId, totalAmount });
  } catch (error) {
    next(error);
  }
};

export const getOrderDetails = async (req, res, next) => {
  try {
    const pool = getPool();
    const [orders] = await pool.query('SELECT * FROM orders WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    if (!orders.length) return res.status(404).json({ message: 'Order not found' });

    const [items] = await pool.query('SELECT * FROM order_items WHERE order_id = ?', [req.params.id]);
    res.json({ order: orders[0], items });
  } catch (error) {
    next(error);
  }
};
